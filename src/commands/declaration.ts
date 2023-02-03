import { AxiosInstance } from 'axios';
import fs from 'fs/promises'
import path from 'path';
import pino from 'pino';
import { DeclarationsApi } from '../api/declarations';
import { Config } from '../config';

function setupLogger(config: Config) {
    return pino({
        name: 'Declaration',
        level: config.LogLevel,
        transport: config.PinoTransport
    })
}

export async function single(args: any, axios: AxiosInstance, config: Config) {
    const api = new DeclarationsApi(axios, config)
    // const logger = setupLogger(config)

    const data = await api.Id(parseInt(args.id)),
        string = JSON.stringify(data)
    if(args.stdout) {
        console.log(string)
        return
    }
    await fs.writeFile(args.file, string)
}

export async function batch(args: any, axios: AxiosInstance, config: Config) {
    const api = new DeclarationsApi(axios, config)
    const logger = setupLogger(config)

    if(!args.stdout) {
        try{await fs.mkdir(config.OutputDirectory, { recursive: true })}catch{}
    }

    for await(const declarations of api.Query(JSON.parse(args.filter))) {
        for(const {id} of declarations) {
            let file
    
            if(!args.stdout) {
                file = path.join(config.OutputDirectory, `${id}.json`)
                try{await fs.access(file); logger.info(`Skipping ${file}`); continue;}catch{}
            }
            
            const declaration = await api.Id(id),
                text = JSON.stringify(declaration, null, args.raw ? null : 2)

            if(args.stdout) {
                console.log(text)
            } else {
                await fs.writeFile(file, text)
                logger.info(`Writed ${file}`)
            }
        }
    }
}
