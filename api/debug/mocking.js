"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
function mock(api, config) {
    const mk = new axios_mock_adapter_1.default(api);
    mk.onPost(`${config.DeclarationsPath}/get`).reply(async (req) => {
        const data = JSON.parse(req.data);
        const aboba = (await promises_1.default.readdir(config.OutputDirectory))
            .slice(data.page * data.size - data.size, data.page * data.size)
            .filter(e => e.endsWith('.json'))
            .map(e => { return { id: parseInt(path_1.default.basename(e, '.json')) }; });
        return [
            200,
            { items: aboba, total: aboba.length }
        ];
    });
    mk.onGet(new RegExp(`${config.DeclarationsPath}/[0-9]+`)).reply(async (req) => {
        const id = req.url.split('/').pop();
        return [
            200,
            JSON.parse(await promises_1.default.readFile(path_1.default.join(config.OutputDirectory, `${id}.json`)))
        ];
    });
    new axios_mock_adapter_1.default(axios_1.default).onPost(`${config.BaseUrl}${config.LoginPath}`).reply(async (req) => {
        return [
            200,
            null,
            { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' }
        ];
    });
}
exports.default = mock;
