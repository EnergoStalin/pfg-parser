import { AxiosInstance } from 'axios';
import fs from 'fs/promises'
import path from 'path';
import pino from 'pino';
import { dot } from 'dot-object'
import { Declaration } from '../api/declarations';
import { Config } from '../config';
import { getMapping } from '../mapper';

function setupLogger(config: Config) {
    return pino({
        name: 'Declaration',
        level: config.LogLevel,
        transport: config.PinoTransport
    })
}

export async function single(id: number, file: string, axios: AxiosInstance, config: Config) {
    const api = new Declaration(axios, config)
    const logger = setupLogger(config)

    const decl = await api.Id(id)
}

export async function batch(query: string, axios: AxiosInstance, config: Config) {
    const api = new Declaration(axios, config)
    const logger = setupLogger(config)

    try{await fs.mkdir(config.OutputDirectory, { recursive: true })}catch{}

    for await(const declarations of api.Query(query)) {
        for(const {id} of declarations) {
            const file = path.join(config.OutputDirectory, `${id}.json`)
    
            try{await fs.access(file); logger.info(`Skipping ${file}`); continue;}catch{}
    
            const declaration = await api.Id(id)
    
            const data = Object.fromEntries(Object.entries(dot(declaration)).filter(([_,v]) => v))
            await fs.writeFile(file, JSON.stringify(data, null, 2))
        }
    }
}
