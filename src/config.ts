import dotenv from 'dotenv'


/**
 * Call this before creating config
 */
export function loadDotEnv() {
    dotenv.config({
        path: process.env.PFG_PARSER_DOTENV_LOCATION ?? '.env'
    })
}

export class ProxyConfig {
    public ProxyHost = process.env.PFG_PARSER_PROXY_HOST
    public ProxyPort = process.env.PFG_PARSER_PROXY_PORT
    public ProxyUser = process.env.PFG_PARSER_PROXY_USER
    public ProxyPassword = process.env.PFG_PARSER_PROXY_PASSWORD

    public static Avalible() { return !!process.env.PFG_PARSER_PROXY_HOST }
}

/**
 * Global library config
 */
export class Config {
    public OutputDirectory = process.env.PFG_PARSER_OUTPUT_DIRECTORY
    public BaseUrl = process.env.PFG_PARSER_BASE_URL ?? 'https://pub.fsa.gov.ru'
    public LoginPath = process.env.PFG_PARSER_LOGIN_PATH ?? '/login'

    public Password = process.env.PFG_PARSER_PASSWORD ?? 'hrgesf7HDR67Bd'
    public User = process.env.PFG_PARSER_USER ?? 'anonymous'

    public MaxRequests = parseInt(process.env.PFG_PARSER_MAX_REQUESTS ?? '1')
    public PerMillisseconds = parseInt(process.env.PFG_PARSER_REQUESTS_PER_MILLICONDS ?? '1000')
    public MaxRps = parseInt(process.env.PFG_PARSER_MAX_RPS ?? '1')

    public DelayGain = parseInt(process.env.PFG_PARSER_RETRY_DELAY_GAIN ?? '2000')
    public Retries = parseInt(process.env.PFG_PARSER_NUM_RETRIES ?? '10')

    public DeclarationsFilter? = process.env.PFG_PARSER_DECLARATIONS_FILTER
    public DeclarationIdentifiersPath = process.env.PFG_PARSER_DECLARATION_IDENTIFIERS_PATH ?? '/api/v1/rds/common/identifiers'
    public DeclarationsPath = process.env.PFG_PARSER_DECLARATIONS_PATH ?? '/api/v1/rds/common/declarations'

    public LogLevel = process.env.PFG_PARSER_LOG_LEVEL ?? 'info'
    public LogStyle? = process.env.PFG_PARSER_LOG_STYLE
    public PinoTransport?

    public ProxyConfig?


    public constructor() {
        if(ProxyConfig.Avalible())
            this.ProxyConfig = new ProxyConfig()
        this.PinoTransport = this.LogStyle === 'pretty' ? {
            target: 'pino-pretty',
            options: {
                colorize: true,
                hideObject: true
            }
        } : null
    }
}
