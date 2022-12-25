import dotenv from 'dotenv'
import { Command } from 'commander'

dotenv.config({
    path: process.env.PFG_PARSER_DOTENV_LOCATION ?? '.env'
})

export class ProxyConfig {
    public ProxyHost = process.env.PFG_PARSER_PROXY_HOST
    public ProxyPort = process.env.PFG_PARSER_PROXY_PORT
    public ProxyUser = process.env.PFG_PARSER_PROXY_USER
    public ProxyPassword = process.env.PFG_PARSER_PROXY_PASSWORD

    public static Avalible() { return !!process.env.PFG_PARSER_PROXY_HOST }
}

export class Config {
    public OutputDirectory = process.env.PFG_PARSER_OUTPUT_DIRECTORY
    public BaseUrl = process.env.PFG_PARSER_BASE_URL ?? 'https://pub.fsa.gov.ru'
    public LoginPath = process.env.PFG_PARSER_LOGIN_PATH ?? '/login'

    public Password = process.env.PFG_PARSER_PASSWORD ?? 'hrgesf7HDR67Bd'
    public User = process.env.PFG_PARSER_USER ?? 'anonymous'

    public MaxRequests = parseInt(process.env.PFG_PARSER_MAX_REQUESTS ?? '4')
    public PerMillisseconds = parseInt(process.env.PFG_PARSER_REQUESTS_PER_MILLICONDS ?? '1000')
    public MaxRps = parseInt(process.env.PFG_PARSER_MAX_RPS ?? '2')

    public DelayGain = parseInt(process.env.PFG_PARSER_RETRY_DELAY_GAIN ?? '2000')
    public Retries = parseInt(process.env.PFG_PARSER_NUM_RETRIES ?? '10')

    public DeclarationsFilter = process.env.PFG_PARSER_DECLARATIONS_FILTER
    public DeclarationsPath = process.env.PFG_PARSER_DECLARATIONS_PATH

    public LogLevel = process.env.PFG_PARSER_LOG_LEVEL ?? 'info'

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
