import dotenv from 'dotenv'
import { Command } from 'commander'

dotenv.config({
    path: process.env.PARSER_DOTENV_LOCATION ?? '.env'
})

export class ProxyConfig {
    public ProxyHost = process.env.PARSER_PROXY_HOST
    public ProxyPort = process.env.PARSER_PROXY_PORT
    public ProxyUser = process.env.PARSER_PROXY_USER
    public ProxyPassword = process.env.PARSER_PROXY_PASSWORD

    public static Avalible() { return !!process.env.PARSER_PROXY_HOST }
}

export class Config {
    public OutputDirectory = process.env.PARSER_OUTPUT_DIRECTORY
    public BaseUrl = process.env.PARSER_BASE_URL ?? 'https://pub.fsa.gov.ru'
    public LoginPath = process.env.PARSER_LOGIN_PATH ?? '/login'

    public Password = process.env.PARSER_PASSWORD ?? 'hrgesf7HDR67Bd'
    public User = process.env.PARSER_USER ?? 'anonymous'

    public MaxRequests = parseInt(process.env.PARSER_MAX_REQUESTS ?? '4')
    public PerMillisseconds = parseInt(process.env.PARSER_REQUESTS_PER_MILLICONDS ?? '1000')
    public MaxRps = parseInt(process.env.PARSER_MAX_RPS ?? '2')

    public DelayGain = parseInt(process.env.PARSER_RETRY_DELAY_GAIN ?? '2000')
    public Retries = parseInt(process.env.PARSER_NUM_RETRIES ?? '10')

    public DeclarationsFilter = process.env.PARSER_DECLARATIONS_FILTER

    public DeclarationsPath = process.env.PARSER_DECLARATIONS_PATH

    public ProxyConfig?

    public constructor() {
        if(ProxyConfig.Avalible())
            this.ProxyConfig = new ProxyConfig()
    }

    public ParseFromArgs() {
        const program = new Command()
        program.description('Delacration parser')

        program.parse()
        return this
    }
}
