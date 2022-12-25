#!/usr/bin/env node

import { auth } from './auth'
import { dot, object } from 'dot-object'
import fs from 'fs/promises'
import { Declaration } from './api/declarations'
import path from 'path'
import { filter } from './read'
import { Config } from './config'
import pino from 'pino'

if(require.main === module)
(async function() {
    const config = new Config().ParseFromArgs()
    const api = await auth(config)
    const logger = pino({
        name: 'Declarations',
        level: config.LogLevel
    })
    // const book = setup_xlsx()
    // const map = dot(mapping)

    try{await fs.mkdir(config.OutputDirectory, { recursive: true })}catch{}

    const declApi = new Declaration(api, config)

    for await(const declarations of declApi.Query(await filter(config))) {
        for(const {id} of declarations) {
            const file = path.join(config.OutputDirectory, `${id}.json`)

            try{await fs.access(file); logger.info('Skipping',file); continue;}catch{}

            const declaration = await declApi.Id(id)
    
            const data = Object.fromEntries(Object.entries(dot(declaration)).filter(([_,v]) => v))
            await fs.writeFile(file, JSON.stringify(data, null, 2))
        }
    }

    // const difff = getMapping(map, dif)

    // const obj = object(difff)

    // await fs.writeFile('properties_mapping.json', JSON.stringify(obj))
    
    // for(const [sheet, data] of Object.entries(multi)) {
    //     const row = [Object.keys(data[0]), ...Object.values(data).map(e => Object.values(e))]
    //     XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(row), sheet)
    // }

    // XLSX.writeFileXLSX(book, './data.xlsx')
})()
