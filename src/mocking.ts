import { AxiosInstance } from 'axios';
import mockAdapter from 'axios-mock-adapter'
import fs from 'fs/promises'
import path from 'path';

export default function mock(api: AxiosInstance) {
    const mk = new mockAdapter(api)


    mk.onPost(`${process.env.PARSER_DECLARATIONS_PATH}/get`).reply(async (config) => {
        const data = JSON.parse(config.data)
        const bbbb = (await fs.readdir(process.env.PARSER_OUTPUT_DIRECTORY))
            .slice(data.page*data.size, data.page*data.size+data.size)
            .filter(e => e.endsWith('.json'))
            .map(e => { return {id: parseInt(path.basename(e, '.json'))} })
        return [
            200,
            bbbb
        ]
    })

    mk.onGet(new RegExp(`${process.env.PARSER_DECLARATIONS_PATH}/\d+`)).reply(async (config) => {
        return [
            200,
            path.join(process.env.PARSER_OUTPUT_DIRECTORY, `${config.url.split('/')[-1]}.json`)
        ]
    })

    mk.onPost(new RegExp(`${process.env.PARSER_LOGIN_PATH}`)).reply(async (config) => {
        return [
            200,
            null,
            { 'authorization': 'bobatoken' }
        ]
    })
}