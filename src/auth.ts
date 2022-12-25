import axios, { AxiosProxyConfig } from 'axios'
import rateLimit from 'axios-rate-limit'
import {kvsLocalStorage} from '@kvs/node-localstorage'
import jwt from 'jwt-decode'
import axiosRetry from 'axios-retry'
import httpsProxyAgent from 'https-proxy-agent'
import https from 'https'
import mock from './api/mocking'
import {Config, ProxyConfig} from './config'
import pino from 'pino'

function getProxy(config: ProxyConfig | null) {
    return config ? httpsProxyAgent({
        host: config.ProxyHost,
        port: config.ProxyPort,
        auth: config.ProxyUser ? `${config.ProxyUser}:${config.ProxyPassword}` : null,
        rejectUnauthorized: false,
    }) : null;
}

async function fetchToken(config: Config) {
    return (await axios.post(`${config.BaseUrl}${config.LoginPath}`, {
        username: config.User,
        password: config.Password
    })).headers['authorization']
}

function isExpired(token: string) {
    return Date.now() >= jwt<{exp: number}>(token).exp * 1000
}

export async function auth(config: Config) {
    const logger = pino({
        name: 'axios',
        level: config.LogLevel,
        transport: config.PinoTransport
    })

    const storage = await kvsLocalStorage({
        name: 'auth',
        version: 1
    })

    const rates = {
        perMilliseconds: config.PerMillisseconds,
        maxRequests: config.MaxRequests,
        maxRPS: config.MaxRps
    }

    const api = rateLimit(axios.create({
        baseURL: config.BaseUrl,
        httpAgent: getProxy(config.ProxyConfig) ?? https.Agent,
        proxy: config.ProxyConfig ?? null
    }), rates)

    let token = await storage.get('auth_token')

    axiosRetry(api, {
        retries: config.Retries,
        retryDelay: (count) => {
            const cooldown = count * config.DelayGain
            logger.error(`503 received retry: ${count} resume after ${cooldown / 1000} seconds`)
            return cooldown
        },
        retryCondition: async (error) => {
            logger.error(error)
            if(error.response?.status === 401) {
                token = await fetchToken(config)
                return true
            }
            return error.response?.status === 503
        }
    })
    
    api.interceptors.request.use(
        async request => {
            if(!token || isExpired(token as string)) {
                token = await fetchToken(config)
                storage.set('auth_token', token)
                logger.debug(`New Token fetched ${token}`)
            }

            request.headers['authorization'] = token as string

            logger.info(request.url)

            return request
        }
    )

    if(process.env.PARSER_ENABLE_MOCKING)
        mock(api, config)

    return api
}
