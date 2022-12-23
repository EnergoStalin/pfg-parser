import fs from 'fs/promises'

export async function filter() {
    return JSON.parse(await fs.readFile(process.env.PARSER_DECLARATIONS_FILTER, { encoding: 'utf-8' }))
}