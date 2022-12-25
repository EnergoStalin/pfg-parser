import { AxiosInstance } from 'axios';
import { Config } from '../config';

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

export class Declaration {
    constructor(private api: AxiosInstance, private config: Config) {}

    public Query(query: any) {
        return paginator(this.api, query)
    }

    public async Id(id: number) {
        return (await this.api.get(`${this.config.DeclarationsPath}/${id}`)).data
    }
}
