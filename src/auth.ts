import axios, { AxiosProxyConfig } from 'axios'
import rateLimit from 'axios-rate-limit'
import {kvsLocalStorage} from '@kvs/node-localstorage'
import jwt from 'jwt-decode'
import axiosRetry from 'axios-retry'
import httpsProxyAgent from 'https-proxy-agent'
import https from 'https'
import dotenv from 'dotenv';
import mock from './mocking'

dotenv.config({
    path: process.env.PARSER_DOTENV_LOCATION ?? '.env'
})

const baseUrl = process.env.PARSER_BASE_URL ?? 'https://pub.fsa.gov.ru'

const loginPath = process.env.PARSER_LOGIN_PATH ?? '/login'
const randomPassword = process.env.PARSER_PASSWORD ?? 'hrgesf7HDR67Bd'
const user = process.env.PARSER_USER ?? 'anonymous'

const maxRequests = parseInt(process.env.PARSER_MAX_REQUESTS ?? '4')
const perMillisseconds = parseInt(process.env.PARSER_REQUESTS_PER_MILLICONDS ?? '1000')
const maxRps = parseInt(process.env.PARSER_MAX_RPS ?? '2')

const delayGain = parseInt(process.env.PARSER_RETRY_DELAY_GAIN ?? '2000')
const numRetries = parseInt(process.env.PARSER_NUM_RETRIES ?? '10')

const proxyHost = process.env.PARSER_PROXY_HOST
const proxyPort = process.env.PARSER_PROXY_PORT
const proxyUser = process.env.PARSER_PROXY_USER
const proxyPassword = process.env.PARSER_PROXY_PASSWORD

const proxy =  proxyHost ? httpsProxyAgent({
    host: proxyHost,
    port: proxyPort,
    auth: proxyUser ? `${proxyUser}:${proxyPassword}` : null,
    rejectUnauthorized: false,
}) : null;

async function fetchToken() {
    return (await axios.post(`${baseUrl}${loginPath}`, {
        username: user,
        password: randomPassword
    })).headers['authorization']
}

function isExpired(token: string) {
    return Date.now() >= jwt<{exp: number}>(token).exp * 1000
}

export default async function() {
    const storage = await kvsLocalStorage({
        name: 'auth',
        version: 1
    })

    const rates = {
        perMilliseconds: perMillisseconds,
        maxRequests: maxRequests,
        maxRPS: maxRps
    }

    const api = rateLimit(axios.create({
        baseURL: baseUrl,
        httpAgent: proxy ?? https.Agent,
        proxy: (proxy !== null) as unknown as AxiosProxyConfig
    }), rates)

    let token = await storage.get('auth_token')

    axiosRetry(api, {
        retries: numRetries,
        retryDelay: (count) => {
            console.log(`503 received retry: ${count}`)
            rates.perMilliseconds *= delayGain
            return count * delayGain
        },
        retryCondition: async (error) => {
            if(error.response?.status !== 503)
                token = await fetchToken()
            return true
        }
    })
    
    api.interceptors.request.use(
        async config => {
            if(!token || isExpired(token as string)) {
                token = await fetchToken()
                storage.set('auth_token', token)
            }

            config.headers['authorization'] = token as string

            console.log(config.url)

            return config
        }
    )

    if(process.env.NODE_ENV === 'development')
        mock(api)

    return api
}