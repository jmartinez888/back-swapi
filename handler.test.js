// handler.test.js

const { fetchStarWarsData, createModel } = require('./handler');

describe('fetchStarWarsData', () => {
    test('should fetch StarWars data correctly', async () => {
        const data = await fetchStarWarsData();
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('nombre');
        expect(data).toHaveProperty('altura');
        // Añadir más expectativas según sea necesario
    });

    // Puedes añadir más pruebas según sea necesario
});

describe('createModel', () => {
    test('should create a model correctly', async () => {
        const mockData = {
            id: '1',
            nombre: 'Luke Skywalker',
            altura: '172',
            peso: '77',
            color_pelo: 'blond',
            color_piel: 'fair',
            color_ojos: 'blue',
            fecha_nacimiento: '19BBY',
            genero: 'male'
        };
        const response = await createModel(mockData);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toHaveProperty('message', 'Modelo creado correctamente');
        // Añadir más expectativas según sea necesario
    });

    // Puedes añadir más pruebas según sea necesario
});
