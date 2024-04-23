const dynamoDb = require('./dynamodb');

const getPeople = async () => {
    try {
        const result = await dynamoDb.scan('people');
        return result;
    } catch (error) {
        console.error('Error al obtener las personas:', error);
        throw error;
    }
};

module.exports.getPeople = async () => {
    try {
        const people = await getPeople();

        if (!people) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Lista de Personas vacia'
                }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Listando Personas',
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
