# Персер pub.fsa.gov.ru

## Возможности

> Примеры указанных значений смотреть в примере конфига

- [ ] Консольный интерфейс
- [ ] Сопоставлять данные из запроса с шаблоном и выдавать их в табличном виде **PARSER_MANUAL_INFO**
- [ ] Обьединять таблицы в единую базу данных xlsx
- [x] Запрашивать декларации по фильтру [с этой страницы](https://pub.fsa.gov.ru/api/v1/rds/common/declarations/get) **PARSER_DECLARATIONS_FILTER** и сохранять в **PARSER_OUTPUT_DIRECTORY**
- [ ] Запрашивать сертификаты по фильтру **PARSER_CERTIFICATES_FILTER**, сохранять их в xlsx **PARSER_OUTPUT_DIRECTORY**

## Установка
Позже выкачу в пакетный менеджер можно будет установить как пакет
```bash
git clone 
yarn
yarn build
yarn run start
```

## Пример .env конфига

> Где лежит .env конфигурация можно указать через переменную окружения **PARSER_DOTENV_LOCATION**


```
NODE_TLS_REJECT_UNAUTHORIZED=0
NODE_ENV=development
PARSER_OUTPUT_DIRECTORY=./data/docs

# Axios setup
PARSER_BASE_URL=https://pub.fsa.gov.ru
PARSER_LOGIN_PATH=/login

# Возможно можно логиниться под аккаунтом каким же способом
PARSER_PASSWORD=biibus
PARSER_USER=anonymous

# Ограничение частоты запросов
PARSER_MAX_REQUESTS=4
PARSER_REQUESTS_PER_MILLICONDS=2000
PARSER_MAX_RPS=2

PARSER_RETRY_DELAY_GAIN=2000
PARSER_NUM_RETRIES=10

# PARSER_PROXY_HOST=178-238-125-38.in-addr.mastertelecom.ru
# PARSER_PROXY_PORT=21345

# Фильтры для поиска
PARSER_DECLARATIONS_FILTER=./data/declarations_filter.json
PARSER_CERTIFICATES_FILTER=./data/certificates_filter.json

PARSER_DECLARATIONS_PATH=/api/v1/rds/common/declarations

# Маппинг данных
PARSER_MANUAL_INFO=./data/mapping
```