// NOT WORKING

function removeIndecies(v) {
    return v.replaceAll(/\[\d+\]/g, '').replaceAll(/\.\d+\./g, '.')
}

(async function() {
    const path = require('path')
    const fs = require('fs/promises')

    const dir = process.argv.length < 2 ? process.argv[2] : './docs'

    const files = await fs.readdir(dir)

    let keys = new Set(Object.keys(JSON.parse((await fs.readFile(path.join(dir, files.shift()))).toString()))
        .map(removeIndecies))

    let contactsLocations = new Set()
    let count = 0

    for(const file of files) {
        const data = Object.keys(JSON.parse((await fs.readFile(path.join(dir, file))).toString())).map(removeIndecies)

        const a = data[data.findIndex((e) => e.includes('contacts'))]
        contactsLocations.add(a)
        console.log(count++, file, a)

        for(const k of keys) {
            if(data.indexOf(k) === -1) {
                keys.delete(k)
            }
        }
    }

    await fs.writeFile('./summary.json', JSON.stringify(Array.from(keys).sort((a, b) => a.length <= b.length), null, 2))
})()