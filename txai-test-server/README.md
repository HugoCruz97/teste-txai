## Start MySQL Docker Container

docker run -it --rm -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=txai --name mysqldb -p 3307:3306 mysql:8.0

## Run migrations

npx prisma migrate dev

## Start application

npm run start:dev