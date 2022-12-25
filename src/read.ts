import fs from 'fs/promises'
import { Config } from './config'

export async function filter(config: Config) {
    return JSON.parse(await fs.readFile(config.DeclarationsFilter, { encoding: 'utf-8' }))
}
