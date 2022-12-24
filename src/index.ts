import login from './auth'
import { dot, object } from 'dot-object'
import fs from 'fs/promises'
import { getDeclarationsPaginator } from './declaration'
import { getDeclarationById } from './request'
import dotenv from 'dotenv'
import path from 'path'
import { filter } from './read'

function getMapping(obj1, obj2) {
    return Object.entries(obj1).reduce((prod, [k, v]) => {
        for(const [kk, vv] of Object.entries(obj2)) {
            if(v === vv) {
                if(Object.hasOwn(prod, k))
                    prod[k].push(kk)
                else
                    prod[k] = [kk]
            }
        }
        return prod
    }, {})
}

(async function() {
    const api = await login()
    const _filter = await filter()
    // const book = setup_xlsx()
    // const map = dot(mapping)

    try{await fs.mkdir(process.env.PARSER_OUTPUT_DIRECTORY, { recursive: true })}catch{}

    let count = 0
    for await(const declarations of getDeclarationsPaginator(api, _filter)) {
        for(const {id} of declarations) {
            const file = path.join(process.env.PARSER_OUTPUT_DIRECTORY, `${id}.json`)

            // try{await fs.access(file); console.log('Skipping',file); continue;}catch{}

            const declaration = await getDeclarationById(api, id)
    
            const data = Object.fromEntries(Object.entries(dot(declaration)).filter(([_,v]) => v))
            await fs.writeFile(file, JSON.stringify(data, null, 2))
        }
        if(count >= 1000) break
        count += 100
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
