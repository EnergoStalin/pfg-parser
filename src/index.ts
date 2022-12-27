#!/usr/bin/env node

import { auth } from './auth'
import { Config, loadDotEnv } from './config'
import { Command } from 'commander'
import { DeclarationsApi } from './api/declarations'
import { batch, single } from './commands/declaration'
import fs from 'fs/promises'

loadDotEnv()

export { auth, DeclarationsApi, Config, loadDotEnv }

if(require.main === module)
(async function() {
    const config = new Config(),
        api = await auth(config)

    const program = new Command()
    program.name('pfg-parser')
        .description('Парсер для сайта https://pub.fsa.gov.ru')
    program.command('declaration')
        .description('Получает декларацию по id и помещает её в указанный файл.')
        .argument('<id>', 'Id декларации')
        .argument('[out-file]', 'Файл на выход если пусто', null)
        .option('--stdout', 'Выводит результат в консоль вместо файла')
        .action(async function(id, file, options) {
            options.id = id
            options.file = file
            try {
                await single(options, api, config)
            } catch {}
        })
    program.command('declarations')
        .description('Получает декларации по filter и помещает её в указанный файл.')
        .argument('<filter>', 'Путь до файла с фильтром либо сам фильтр в json формате пример фильтра есть в репозитории папке data')
        .argument('[output-directory]', 'Переопределить config.OutputDirectory', null)
        .option('--stdout', 'Выводит результат в консоль вместо файла')
        .option('--raw', 'Убирает форматирование')
        .action(async function(filter, output_directory, options) {
            try{options.filter = (await fs.readFile(filter)).toString()}catch{options.filter = filter}
            config.OutputDirectory ??= output_directory
            try {
                await batch(options, api, config)
            } catch {}
        })

    program.parse()
})()
