Админка

Два компонента:
* frontend - react-admin
* backend/api - express/json-server

Оба компонента запускаются выполнением yarn|npm run start в обеих папках

Фронтенд запускается на 3000 порту, backend/api - 4000


Для работы backend/api необходимо:

1) файл secret - хранящий в себе только соль для хэширования JWT токена
2) users.json - key-value для пользователей login - хэш пароля по алгоритму argon2id
3) db.json - "база данных" 

Примеры всех вышепричесленных файлов с расширением .dist
