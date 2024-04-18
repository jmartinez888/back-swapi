# API de StarWars

Esta API permite obtener datos de StarWars y crear modelos en una base de datos DynamoDB local.

## Requisitos previos
- Node.js y npm instalados en tu máquina
- Docker instalado en tu máquina

## Configuración inicial
1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias del proyecto.

## Iniciar DynamoDB local
1. Ejecuta `docker-compose up -d` para iniciar DynamoDB local en un contenedor Docker.

## Ejecutar la API localmente
1. Ejecuta `npm start` para iniciar la API localmente.
2. Accede a `http://localhost:3001/api-docs` en tu navegador para ver la documentación de la API generada por Swagger.

## Uso de la API
- `GET /starwars`: Obtiene datos de StarWars.
- `POST /model`: Crea un modelo en DynamoDB.

## Variables de entorno
- `DYNAMODB_TABLE`: Nombre de la tabla de DynamoDB.
