import axios, { AxiosInstance } from 'axios';
import mockAdapter from 'axios-mock-adapter'
import fs from 'fs/promises'
import path from 'path';
import { Config } from '../config';

export default function mock(api: AxiosInstance, config: Config) {
    const mk = new mockAdapter(api)


    mk.onPost(`${config.DeclarationsPath}/get`).reply(async (req) => {
        const data = JSON.parse(req.data)
        const aboba = (await fs.readdir(config.OutputDirectory))
            .slice(data.page*data.size-data.size, data.page*data.size)
            .filter(e => e.endsWith('.json'))
            .map(e => { return {id: parseInt(path.basename(e, '.json'))} })
        return [
            200,
            { items: aboba, total: aboba.length }
        ]
    })

    mk.onGet(new RegExp(`${config.DeclarationsPath}/[0-9]+`)).reply(async (req) => {
        const id = req.url.split('/').pop()
        return [
            200,
            JSON.parse(await fs.readFile(path.join(config.OutputDirectory, `${id}.json`)) as any as string)
        ]
    })

    new mockAdapter(axios).onPost(`${config.BaseUrl}${config.LoginPath}`).reply(async (req) => {
        return [
            200,
            null,
            { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' }
        ]
    })
}
