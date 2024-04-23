const dynamoDb = require('./dynamodb');

const deletePeople = async (id) => {

    try {
        const result = await dynamoDb.delete(id, 'people');
        return result;
    } catch (error) {
        console.error('Error al eliminar persona', error);
        throw error;
    }
};

module.exports.deletePeople = async (event) => {
    try {
        const id = event.pathParameters.id;
        const people = await deletePeople(id);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Persona eliminada correctamente',
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
