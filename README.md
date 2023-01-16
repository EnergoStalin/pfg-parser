# Персер pub.fsa.gov.ru

## Возможности

> Примеры указанных значений смотреть в конфигe

- [x] Консольный интерфейс
- [x] Запрашивать декларации по фильтру [с этой страницы](https://pub.fsa.gov.ru/rds/declaration) **PARSER_DECLARATIONS_FILTER** и сохранять в **PARSER_OUTPUT_DIRECTORY**
- [x] npm пакет для использования как библиотеки
- [x] docker образ

Информацию по точно присутствующим полям можно посмотреть [тут](https://github.com/EnergoStalin/pfg-parser/blob/master/data/summary.json).
Скрипт для генерации находится в той же папке.
> **NOTE** статистика собрана мной из выборки в 1233 последние декларации так что может быть не точной по отношению к старым данным

## Установка
### Docker
```powershell
docker pull ghcr.io/energostalin/pfg-parser
docker run -v data:/app/out ghcr.io/energostalin/pfg-parser --help
```
### Yarn
```powershell
yarn set version stable
yarn init
yarn add @energostalin/pfg-parser@latest
yarn exec pfg-parser --help
```
### Или как пакет через yarn
См. примеры в папке [examples](https://github.com/EnergoStalin/pfg-parser/tree/master/examples)

## Пример .env конфига
> Где лежит .env конфигурация можно указать через переменную окружения **PFG_PARSER_DOTENV_LOCATION**. Дефолтные значения указаны справа.

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
