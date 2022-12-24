import axios, { AxiosInstance } from 'axios';
import mockAdapter from 'axios-mock-adapter'
import fs from 'fs/promises'
import path from 'path';

export default function mock(api: AxiosInstance) {
    const mk = new mockAdapter(api)


    mk.onPost(`${process.env.PARSER_DECLARATIONS_PATH}/get`).reply(async (config) => {
        const data = JSON.parse(config.data)
        const aboba = (await fs.readdir(process.env.PARSER_OUTPUT_DIRECTORY))
            .slice(data.page*data.size-data.size, data.page*data.size)
            .filter(e => e.endsWith('.json'))
            .map(e => { return {id: parseInt(path.basename(e, '.json'))} })
        return [
            200,
            { items: aboba, total: aboba.length }
        ]
    })

    mk.onGet(new RegExp(`${process.env.PARSER_DECLARATIONS_PATH}/[0-9]+`)).reply(async (config) => {
        const id = config.url.split('/').pop()
        return [
            200,
            JSON.parse(await fs.readFile(path.join(process.env.PARSER_OUTPUT_DIRECTORY, `${id}.json`)) as any as string)
        ]
    })

    new mockAdapter(axios).onPost(`${process.env.PARSER_BASE_URL}${process.env.PARSER_LOGIN_PATH}`).reply(async (config) => {
        return [
            200,
            null,
            { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' }
        ]
    })
}
