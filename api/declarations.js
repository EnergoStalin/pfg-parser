"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaration = void 0;
class Declaration {
    api;
    config;
    constructor(api, config) {
        this.api = api;
        this.config = config;
    }
    Query(query) {
        return this._paginator(query);
    }
    async Id(id) {
        return (await this.api.get(`${this.config.DeclarationsPath}/${id}`)).data;
    }
    async Identifiers() {
        return (await this.api.get(this.config.DeclarationIdentifiersPath)).data;
    }
    async *_paginator(filter, page = 1, limit = 100) {
        const fl = JSON.parse(JSON.stringify(filter));
        fl.page = page;
        fl.size = limit;
        let declarations;
        do {
            declarations = (await this.api.post(`${this.config.DeclarationsPath}/get`, fl)).data;
            yield declarations.items;
            fl.page++;
        } while (declarations.items.length !== 0 || declarations.total !== 0);
    }
}
exports.Declaration = Declaration;
