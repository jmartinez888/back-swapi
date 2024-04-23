'use strict';

const AWS = require('aws-sdk-mock');
const { getPeople } = require('../src/getPeople');

describe('getPeople', () => {
    afterEach(() => {
        AWS.restore('DynamoDB.DocumentClient');
    });

    it('should return a list of people', async () => {
        const mockItems = [
            { id: '1', nombre: 'Luke Skywalker' },
            { id: '2', nombre: 'Darth Vader' }
        ];

        AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
            callback(null, { Items: mockItems });
        });

        const result = await getPeople();
        expect(result).toEqual(mockItems);
    });

    it('should return a 404 status code if no people are found', async () => {
        AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
            callback(null, { Items: [] });
        });

        const result = await getPeople();
        expect(result.statusCode).toBe(404);
        expect(JSON.parse(result.body).message).toBe('Lista de Personas vacia');
    });

    it('should return a 500 status code if an error occurs', async () => {
        AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
            callback(new Error('Error fetching data'));
        });

        const result = await getPeople();
        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.body).message).toBe('Error al procesar la solicitud');
    });
});
