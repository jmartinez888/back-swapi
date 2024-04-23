const dynamoDb = require('./dynamodb');

const getPeopleById = async (id) => {
    try {
        const result = await dynamoDb.get(id, 'people');
        return result;
    } catch (error) {
        console.error('Error al obtener el modelo:', error);
        throw error;
    }
};

module.exports.getPeopleById = async (event) => {
    try {
        const id = event.pathParameters.id;
        const people = await getPeopleById(id);

        if (!people) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Persona no encontrado'
                }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Persona encontrado',
                data: people
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
