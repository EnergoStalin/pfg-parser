#!/usr/bin/env node

import { auth } from './auth'
import { Config } from './config'
import { Command } from 'commander'
import { Declaration } from './api/declarations'

if(require.main === module)
(async function() {
    const config = new Config()
    const api = await auth(config)
    
    const program = new Command()
    program.name('pfg-parser')
        .description('Парсер для сайта https://pub.fsa.gov.ru')
    program.command('declaration <id> [outFile]')
        .description('Получает декларацию по id и помещает её в указанный файл.')
        .action(async function(id, file) {
            const decl = await (new Declaration(api, config)).Id(id)
            console.log(decl)
        })

    program.parse()
})()
