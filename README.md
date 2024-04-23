# Instrucciones de uso

¡Bienvenido a nuestro servicio Serverless!

Este servicio utiliza AWS Lambda y DynamoDB para proporcionar una API RESTful para gestionar información sobre personas del universo de Star Wars.

## Requisitos previos

- Node.js instalado en tu máquina local
- Una cuenta de AWS con permisos para crear y gestionar servicios de Lambda y DynamoDB
- El framework Serverless instalado globalmente en tu máquina (`npm install -g serverless`)

## Configuración inicial

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias con `npm install`.

## Despliegue del servicio

1. Configura tus credenciales de AWS en tu máquina local utilizando AWS CLI.
2. Despliega el servicio en AWS con el comando `serverless deploy`.

## Uso de la API

Una vez desplegado, puedes utilizar la siguiente información para interactuar con la API:

- `GET /people`: Obtiene una lista de todas las personas.
- `POST /people`: Crea una nueva persona.
- `GET /people/{id}`: Obtiene los detalles de una persona específica.
- `PUT /people/{id}`: Actualiza los detalles de una persona existente.
- `DELETE /people/{id}`: Elimina una persona.

## Ejemplo de solicitud

```bash
curl https://YOUR_API_GATEWAY_URL/people
```

## Notas adicionales

- Asegúrate de tener configurados los permisos necesarios en tu cuenta de AWS para crear y gestionar servicios Lambda y DynamoDB.
- Si deseas realizar cambios en la configuración del servicio, modifica el archivo serverless.yml y vuelve a desplegar el servicio con serverless deploy.
¡Disfruta utilizando nuestro servicio Serverless!