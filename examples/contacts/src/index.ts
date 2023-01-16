import { auth, DeclarationsApi, Config } from '@energostalin/pfg-parser'
import fs from 'fs/promises'

process.env.NODE_TLS_REJECT_UNAUTHORIZED="0"

function normalizeName(name: string) {
    return name[0] + name.slice(1).toLowerCase()
}

function getNames(applicant) {
    const names = (Object.entries(applicant).filter(e => {
        const key = e[0].toLowerCase()
        return key.includes('responsible') &&
        (key.includes('name') || key.includes('patronymic')) &&
        !key.includes('doc')
    }).map(e => e[1]).filter(e => e) as string[]).map(normalizeName)

    return names.length ? names : applicant.fullName.split(' ').map(normalizeName)
}

const config = new Config()

config.LogLevel = "silent"

const api = new DeclarationsApi(await auth(config), config)
const filter = JSON.parse((await fs.readFile('./data/declarations_filter.json')).toString('utf-8'))

for await(const batch of api.Query(filter)) {
    for(const {id} of batch) {
        const declaration = await api.Id(id)

        const applicant = declaration.applicant
        const phones = applicant.contacts.filter(e => e.idContactType === 1).map(e => e.value)
        const emails = applicant.contacts.filter(e => e.idContactType === 4).map(e => e.value)
        const names = getNames(applicant)

        console.log(id, names, phones, emails)
    }
    break
}
