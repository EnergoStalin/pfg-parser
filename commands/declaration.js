"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.batch = exports.single = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const pino_1 = __importDefault(require("pino"));
const declarations_1 = require("../api/declarations");
function setupLogger(config) {
    return (0, pino_1.default)({
        name: 'Declaration',
        level: config.LogLevel,
        transport: config.PinoTransport
    });
}
async function single(args, axios, config) {
    const api = new declarations_1.Declaration(axios, config);
    // const logger = setupLogger(config)
    const data = await api.Id(parseInt(args.id)), string = JSON.stringify(data);
    if (args.stdout) {
        console.log(string);
        return;
    }
    await promises_1.default.writeFile(args.file, string);
}
exports.single = single;
async function batch(args, axios, config) {
    const api = new declarations_1.Declaration(axios, config);
    const logger = setupLogger(config);
    if (!args.stdout) {
        try {
            await promises_1.default.mkdir(config.OutputDirectory, { recursive: true });
        }
        catch { }
    }
    for await (const declarations of api.Query(JSON.parse(args.filter))) {
        for (const { id } of declarations) {
            let file;
            if (!args.stdout) {
                file = path_1.default.join(config.OutputDirectory, `${id}.json`);
                try {
                    await promises_1.default.access(file);
                    logger.info(`Skipping ${file}`);
                    continue;
                }
                catch { }
            }
            const declaration = await api.Id(id), text = JSON.stringify(declaration, null, args.raw ? null : 2);
            if (args.stdout) {
                console.log(text);
            }
            else {
                await promises_1.default.writeFile(file, text);
            }
        }
    }
}
exports.batch = batch;
