# vk-watch
Node.JS скрипт который уведомляет о новых постах vk.com по заданым поисковым запросам.

## Настройка и запуск через pm2 
1. В директории с проектом: 
```
npm i
cp config-example.js config.js
```
2. Внесите в config.js [сервисный ключ vk](https://vk.com/dev/access_token?f=3.%20%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%BB%D1%8E%D1%87%20%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0) (vk.token)
3. Внесите токен телеграм-бота (tg.token) и chatId (tg.chatId), куда будут присылаться уведомления
4. Внесите список отслеживаемых запросов (request)
5. Настройте периодический запуск скрипта через pm2
```
pm2 start source/index.js --cron "*/15 * * * *" --name 'vk-watch'
```
