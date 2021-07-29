# test-task-vk-development-lab

## Описание

В репозитории находится тестовое задание для компаниии `VK Development Lab` на позицию Front-end разработчик (React/Redux)

[Ссылка на описание задание](./task.md)

## Запуск и разработка

1. Установить пакеты

```sh
npm i
# or
yarn
```

2. Создать в корне проекта `.env` файл и записать туда ключ

получить api key можно [тут](https://home.openweathermap.org/api_keys)
```
OPEN_WEATHER_MAP_KEY = 'sekret key'
```

3. Для того что бы запустить локаольно в разработке нужно

```sh
npm start
# or
yarn bash
```

4. Для того что бы запустить в production нужно:

- Собрать react приложение
```sh
npm run build
# or
yarn build
```
- Поместить файлы на сервер
```sh
cd build; # Перейти в папку build
rsync --archive --compress --delete . `user`@`ip`:`Путь к папке на сервере` # Отправляем данные на сервер
```
