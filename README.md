# Персер pub.fsa.gov.ru

## Возможности

> Примеры указанных значений смотреть в примере конфига

- [x] Консольный интерфейс
- [ ] Сопоставлять данные из запроса с шаблоном и выдавать их в табличном виде **PARSER_MANUAL_INFO**
- [ ] Обьединять таблицы в единую базу данных xlsx
- [x] Запрашивать декларации по фильтру [с этой страницы](https://pub.fsa.gov.ru/api/v1/rds/common/declarations/get) **PARSER_DECLARATIONS_FILTER** и сохранять в **PARSER_OUTPUT_DIRECTORY**
- [x] npm пакет
- [x] docker образ

## Установка
### Docker
```powershell
docker login -u GITHUB_USERNAME -p GITHUB_TOKEN ghcr.io
docker pull ghcr.io/energostalin/pfg-parser
docker start -v data:/app/out ghcr.io/energostalin/pfg-parser -- declaration 131232 ./out/131232.xslx
```
### Yarn
NODE_AUTH_TOKEN токен от гитхаба с разрешениями registry:read
### **.yarnrc.yml**
```yaml
npmScopes:
  energostalin:
    npmAlwaysAuth: true
    npmAuthToken: "${NODE_AUTH_TOKEN-aboba}"
    npmPublishRegistry: "https://npm.pkg.github.com/"
    npmRegistryServer: "https://npm.pkg.github.com/"
```
```powershell
yarn set version stable
yarn init
yarn add @energostalin/pfg-parser@latest
yarn exec pfg-parser declaration 131232 ./131232.xslx
```

## Пример .env конфига
> Где лежит .env конфигурация можно указать через переменную окружения **PFG_PARSER_DOTENV_LOCATION**. Все опции так же доступны через аргументы командной строки только без префикса **PFG_PARSER**.

> **Note** в случае с докером надо прокинуть конфиг в контейнер через флаг -v указав в **PFG_PARSER_DOTENV_LOCATION** путь до файла внутри контейнера


```
# У сайта не валидные сертификаты поэтому их нужно отключить
NODE_TLS_REJECT_UNAUTHORIZED=0

PFG_PARSER_OUTPUT_DIRECTORY=./data/docs

# Axios setup
PFG_PARSER_BASE_URL=https://pub.fsa.gov.ru
PFG_PARSER_DECLARATIONS_PATH=/api/v1/rds/common/declarations
PFG_PARSER_LOGIN_PATH=/login

# Возможно можно логиниться под аккаунтом таким же способом не проверял т. к. нет аккаунта
PFG_PARSER_PASSWORD=biibus
PFG_PARSER_USER=anonymous

# Ограничение частоты запросов плагин axios-rate-limit
PFG_PARSER_MAX_REQUESTS=4
PFG_PARSER_REQUESTS_PER_MILLICONDS=2000
PFG_PARSER_MAX_RPS=2

# Плагин axios-retry
PFG_PARSER_RETRY_DELAY_GAIN=2000
PFG_PARSER_NUM_RETRIES=10

# Прокси https-proxy-agent
# PFG_PARSER_PROXY_HOST=178-238-125-38.in-addr.mastertelecom.ru
# PFG_PARSER_PROXY_PORT=21345

# Фильтры для поиска
PFG_PARSER_DECLARATIONS_FILTER=./data/declarations_filter.json
```
