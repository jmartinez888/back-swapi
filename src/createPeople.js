const dynamoDB = require('./dynamodb');
const { v4 } = require('uuid');

const createPeople = async (data) => {
    const peopleData = {
        id: { S: data.id.toString() },
        nombre: { S: data.nombre },
        altura: { S: data.altura },
        peso: { S: data.peso.toString() },
        color_pelo: { S: data.color_pelo },
        color_piel: { S: data.color_piel },
        color_ojos: { S: data.color_ojos },
        fecha_nacimiento: { S: data.fecha_nacimiento },
        genero: { S: data.genero },
        createAt: { S: data.createAt }
    };
    try {
        const res = await dynamoDB.put(peopleData, 'people');
        // console.log('Persona creado correctamente:', res);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Persona creado correctamente',
                data: data
            }),
        };
    } catch (error) {
        console.error('Error al crear el Persona:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error al crear el Persona',
                error: error.message
            }),
        };
    }
};

module.exports.createPeople = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const data = { id: v4(), ...requestBody, createAt: new Date() };
        const createdPeople = await createPeople(data);

        return createdPeople;
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