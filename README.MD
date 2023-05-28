# kamballists-tours
Камбаллисты — ЛЦТ 2023. Кейс 17 «Рекомендательный сервис формирования персональных туристических пакетов»

**Сборка проекта**
Загрузить и установить docker
Загрузить проект
Запуск выполнить команду docker-compose up
Готтово!

**Информация о стеке**
Фронтенд: Vue/Typescript
Бек: Laravel/PHP/MongoDB
ML: Python/Django

**Описание сервисов
Все контенеры в отдельных папках

tours-nginx - запуск веб морды +прокси для сервисов
tours-backend - бек для сайта
tours-mongo - контейнер для хранения временной монги))
tours-frontend - фронт
tours-mongo-seed - загрузка сидов при старте монги


click me -->>   https://disk.yandex.ru/d/sZXBDpDGz2Pzfg   <<-- click me

Прототип
http://tours.primertone.com


figma
https://www.figma.com/file/i7QWecAaT5rDIzR462pxIF/%D0%9D%D0%B0%D0%B1%D1%80%D0%BE%D1%81%D0%BA%D0%B8?type=design&node-id=0-1&t=AuJ2CLNpvOeJxHe7-0

https://www.figma.com/file/MAHGP8FZz8x9YFjCs8WN7J/Ruspass-(Copy)?type=design&node-id=10-63&t=nz1FnRCkwZjXAmOj-0



git
https://github.com/mitrikov/kamballists-tours



Swagger
https://app.swaggerhub.com/apis/IgroGood/Turs/1


New User:

GET /new-user - http://localhost/backend/api/new-user
Like:

GET /like - http://localhost/backend/api/like
Get Events:

GET /events - http://localhost/backend/api/events
Get Event by ID:

GET /events/{id} - http://localhost/backend/api/events/{id}
Get Excursions:

GET /excursions - http://localhost/backend/api/excursions
Get Excursion by ID:

GET /excursions/{id} - http://localhost/backend/api/excursions/{id}
Get Hotels:

GET /hotels - http://localhost/backend/api/hotels
Get Hotel by ID:

GET /hotels/{id} - http://localhost/backend/api/hotels/{id}
Get Restaurants:

GET /restaurants - http://localhost/backend/api/restaurants
Get Restaurant by ID:

GET /restaurants/{id} - http://localhost/backend/api/restaurants/{id}
Get Places:

GET /places - http://localhost/backend/api/places
Get Place by ID:

GET /places/{id} - http://localhost/backend/api/places/{id}
Get Regions:

GET /regions - http://localhost/backend/api/regions
Get Region by ID:

GET /regions/{id} - http://localhost/backend/api/regions/{id}
Get Cities:

GET /cities - http://localhost/backend/api/cities
Get City by ID:

GET /cities/{id} - http://localhost/backend/api/cities/{id}
Get Routes:

GET /routes - http://localhost/backend/api/routes
Get Route by ID:

GET /routes/{id} - http://localhost/backend/api/routes/{id}
Get Tours:

GET /tours - http://localhost/backend/api/tours
Get Tour by ID:

GET /tours/{id} - http://localhost/backend/api/tours/{id}
Get Tracks:

GET /tracks - http://localhost/backend/api/tracks
Get Track by ID:

GET /tracks/{id} - http://localhost/backend/api/tracks/{id}