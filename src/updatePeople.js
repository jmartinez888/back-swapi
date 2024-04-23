
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

const updatePeople = async (id, requestBody) => {
    if (!requestBody.nombre || !requestBody.peso || !requestBody.color_pelo || !requestBody.color_piel || !requestBody.color_ojos) {
        throw new Error('Todos los campos son obligatorios');
    }

    const updateExpression = "set nombre = :nombre, peso = :peso, color_pelo = :color_pelo, color_piel = :color_piel, color_ojos = :color_ojos";

    const expressionAttributeValues = {
        ":nombre": { S: requestBody.nombre },
        ":peso": { S: requestBody.peso.toString() },
        ":color_pelo": { S: requestBody.color_pelo },
        ":color_piel": { S: requestBody.color_piel },
        ":color_ojos": { S: requestBody.color_ojos },
    };

    const params = {
        TableName: 'people',
        Key: { id: { S: id.toString() } },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
    };

    try {
        const result = await dynamoDb.update(params);
        return result;
    } catch (error) {
        console.error('Error al actualizar datos.', error);
        throw error;
    }
};

module.exports.updatePeople = async (event) => {
    try {
        const id = event.pathParameters.id;
        const requestBody = JSON.parse(event.body);
        const people = await getPeopleById(id);

        if (!people) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Persona no encontrado'
                }),
            };
        }

        const updatedPeople = await updatePeople(id, requestBody);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Datos actualizados correctamente',
                data: updatedPeople
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
