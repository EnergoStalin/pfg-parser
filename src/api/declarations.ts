import { AxiosInstance } from 'axios';
import { Config } from '../config';

/**
 * Main class for intaraction with api
 */
export class DeclarationsApi {
    constructor(private api: AxiosInstance, private config: Config) {}

    /**
     * @param query Json object
     * @returns Return async generator for pagination
     */
    public Query(query: any) {
        return this._paginator(query)
    }

    /**
     * @param id declaration id
     * @returns declaration
     */
    public async Id(id: number) {
        return (await this.api.get(`${this.config.DeclarationsPath}/${id}`)).data
    }

    /**
     * Fetch identifiers or simply get localisation
     */
    public async Identifiers() {
        return (await this.api.get(this.config.DeclarationIdentifiersPath)).data
    }

    private async *_paginator(filter: any, page: number = 1, limit: number = 100) {
        const fl = JSON.parse(JSON.stringify(filter))
        fl.page = page
        fl.size = limit
        let declarations
        do {
            declarations = (await this.api.post(`${this.config.DeclarationsPath}/get`, fl)).data
            yield declarations.items
            fl.page++
        } while(declarations.items.length !== 0 || declarations.total !== 0)
    }
}
