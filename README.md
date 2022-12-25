# Персер pub.fsa.gov.ru

## Возможности

> Примеры указанных значений смотреть в примере конфига

- [x] Консольный интерфейс
- [ ] Сопоставлять данные из запроса с шаблоном и выдавать их в табличном виде **PARSER_MANUAL_INFO**
- [ ] Обьединять таблицы в единую базу данных xlsx
- [x] Запрашивать декларации по фильтру [с этой страницы](https://pub.fsa.gov.ru/api/v1/rds/common/declarations/get) **PARSER_DECLARATIONS_FILTER** и сохранять в **PARSER_OUTPUT_DIRECTORY**
- [ ] Запрашивать сертификаты по фильтру **PARSER_CERTIFICATES_FILTER**, сохранять их в xlsx **PARSER_OUTPUT_DIRECTORY**

## Окружение

nodejs 19

## Установка
```powershell
git clone https://github.com/EnergoStalin/pfg-parser
yarn
yarn build
yarn start
```

## Пример .env конфига

> Где лежит .env конфигурация можно указать через переменную окружения **PFG_PARSER_DOTENV_LOCATION**. Все опции так же доступны через аргументы командной строки только без префикса **PFG_PARSER**.


```
NODE_TLS_REJECT_UNAUTHORIZED=0
PFG_PARSER_OUTPUT_DIRECTORY=./data/docs

# Axios setup
PFG_PARSER_BASE_URL=https://pub.fsa.gov.ru
PFG_PARSER_LOGIN_PATH=/login

# Возможно можно логиниться под аккаунтом каким же способом
PFG_PARSER_PASSWORD=biibus
PFG_PARSER_USER=anonymous

# Ограничение частоты запросов
PFG_PARSER_MAX_REQUESTS=4
PFG_PARSER_REQUESTS_PER_MILLICONDS=2000
PFG_PARSER_MAX_RPS=2

PFG_PARSER_RETRY_DELAY_GAIN=2000
PFG_PARSER_NUM_RETRIES=10

# PFG_PARSER_PROXY_HOST=178-238-125-38.in-addr.mastertelecom.ru
# PFG_PARSER_PROXY_PORT=21345

# Фильтры для поиска
PFG_PARSER_DECLARATIONS_FILTER=./data/declarations_filter.json
PFG_PARSER_CERTIFICATES_FILTER=./data/certificates_filter.json

PFG_PARSER_DECLARATIONS_PATH=/api/v1/rds/common/declarations

# Маппинг данных
PFG_PARSER_MANUAL_INFO=./data/mapping
```
