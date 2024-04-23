
'use strict';

const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const esTest = process.env.JEST_WORKER_ID;
const config = {
    convertEmptyValues: true,
    ...(esTest && {
        endpoint: 'localhost:8000',
        sslEnabled: false,
        region: 'local-env',
    }),
};

const ddb = new DocumentClient(config);

const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const { getPeopleById } = require('../src/getPeopleById');
const DynamoDB = require('aws-sdk/clients/dynamodb');

describe('getPeopleById', () => {
    beforeAll(() => {
        // Configurar la conexión a DynamoDB local
        process.env.AWS_REGION = 'local';
        process.env.AWS_ACCESS_KEY_ID = 'fake';
        process.env.AWS_SECRET_ACCESS_KEY = 'fake';
        process.env.AWS_DYNAMODB_ENDPOINT = 'http://localhost:8000';

        // Configurar la tabla en DynamoDB local
        const dynamodb = new DynamoDB.DocumentClient();
        dynamodb.createTable({
            TableName: 'StartwarsTable',
            KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
            AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
            ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
        }).promise();
    });

    beforeEach(() => {
        // Limpiar la tabla antes de cada prueba
        DocumentClient.mockClear();
        DocumentClient.mockReturnValue({
            get: jest.fn().mockReturnValue({
                promise: jest.fn().mockResolvedValue({ Item: { id: '1', nombre: 'Luke Skywalker' } }),
            }),
        });
    });

    afterAll(() => {
        // Eliminar la tabla y desconectar de DynamoDB local después de todas las pruebas
        const dynamodb = new DynamoDB.DocumentClient();
        dynamodb.deleteTable({ TableName: 'StartwarsTable' }).promise();
    });

    it('should return a person by id', async () => {
        const event = { pathParameters: { id: '1' } };
        const result = await getPeopleById(event);
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).data).toEqual({ id: '1', nombre: 'Luke Skywalker' });
    });
});
