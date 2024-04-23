const dynamoDB = require('../src/dynamodb');

describe('DynamoDB', () => {
    it('DynamoDB is an object', () => {
        expect(typeof dynamoDB).toEqual('object');
    });

    it('dynamo funstions', () => {
        expect(typeof dynamoDB.get).toEqual('function');
        expect(typeof dynamoDB.scan).toEqual('function');
        expect(typeof dynamoDB.put).toEqual('function');
        expect(typeof dynamoDB.update).toEqual('function');
        expect(typeof dynamoDB.delete).toEqual('function');
    });

    const validTableName = 'people';
    const requestBody = {
        "id": "ea28850b-e3a0-4993-859b-be210ba2dff6",
        "nombre": "holaiiii",
        "altura": "167",
        "peso": "75",
        "color_pelo": "n/a",
        "color_piel": "gold",
        "color_ojos": "yellow",
        "fecha_nacimiento": "112BBY",
        "genero": "n/a",
        "createAt": "2024-04-15"
    }
    it('DynamoDB put people', async () => {
        try {
            const res = await dynamoDB.put(requestBody, validTableName);
            expect(res).toEqual({
                message: "Persona creado correctamente",
                data: {
                    "id": requestBody.id,
                    "nombre": requestBody.nombre,
                    "altura": requestBody.altura,
                    "peso": requestBody.peso,
                    "color_pelo": requestBody.color_pelo,
                    "color_piel": requestBody.color_piel,
                    "color_ojos": requestBody.color_ojos,
                    "fecha_nacimiento": requestBody.fecha_nacimiento,
                    "genero": requestBody.genero,
                    "createAt": expect.any(String),
                }
            });
        } catch (error) {
            console.log('error in dynamodb put test', error);
        }
    });
    it('DynamoDB scan people', async () => {
        try {
            const res = await dynamoDB.scan(validTableName);
            expect(res).toEqual({
                message: "Listando Personas",
                data: expect.any(Array)
            });
        } catch (error) {
            console.log('error in dynamodb scan test', error);
        }
    });


});

