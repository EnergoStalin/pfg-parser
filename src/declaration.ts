import { AxiosInstance } from 'axios';

async function *paginator(api: AxiosInstance, filter: any, page: number = 1, limit: number = 100) {
    const fl = JSON.parse(JSON.stringify(filter))
    fl.page = page
    fl.size = limit
    let declarations
    do {
        declarations = (await api.post(`${process.env.PARSER_DECLARATIONS_PATH}/get`, fl)).data
        yield declarations.items
        fl.page++
    } while(declarations.items.length !== 0 || declarations.total !== 0)
}

export function getDeclarationsPaginator(api: AxiosInstance, filter) {
    return paginator(api, filter)
}
