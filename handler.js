
'use strict';

const axios = require('axios');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'localhost', // Región por defecto de DynamoDB local
  endpoint: 'http://localhost:8000', // Endpoint por defecto de DynamoDB local
  accessKeyId: 'fakeAccessKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
});

// Función para obtener datos de StarWars
const fetchStarWarsData = async () => {
  try {
    const response = await axios.get('https://swapi.py4e.com/api/people/2/');
    const data = response.data;

    return {
      id: data.url.split('/')[5],
      nombre: data.name,
      altura: data.height,
      peso: data.mass,
      color_pelo: data.hair_color,
      color_piel: data.skin_color,
      color_ojos: data.eye_color,
      fecha_nacimiento: data.birth_year,
      genero: data.gender
    };
  } catch (error) {
    console.error('Error fetching StarWars data:', error);
    throw error;
  }
};

module.exports.swapiTranslate = async (event) => {
  try {
    const starWarsData = await fetchStarWarsData();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Datos de StarWars obtenidos correctamente',
        data: starWarsData
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al obtener datos de StarWars',
        error: error.message
      }),
    };
  }
};

// Función para crear un modelo en DynamoDB
const createModel = async (data) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: data,
  };

  try {
    await dynamoDb.put(params).promise();
    console.log('Modelo creado correctamente:', data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Modelo creado correctamente',
        data: data
      }),
    };
  } catch (error) {
    console.error('Error al crear el modelo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al crear el modelo',
        error: error.message
      }),
    };
  }
};

// Función para manejar la solicitud de creación de modelo
module.exports.createModel = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const createdModel = await createModel(requestBody);

    return createdModel;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al procesar la solicitud',
        error: error.message
      }),
    };
  }
};

module.exports.getModel = async (event) => {
  try {
    const id = event.pathParameters.id;
    const model = await getModelById(id);

    if (!model) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Modelo no encontrado'
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Modelo encontrado',
        data: model
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al procesar la solicitud',
        error: error.message
      }),
    };
  }
};

const getModelById = async (id) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id: id },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    return result.Item;
  } catch (error) {
    console.error('Error al obtener el modelo:', error);
    throw error;
  }
};


