const axios = require('axios');
const { translatePeople } = require('../src/translatePeople');

jest.mock('axios');

describe('translatePeople', () => {
    it('should fetch and transform StarWars data correctly', async () => {
        const mockResponse = {
            data: {
                "name": "Luke Skywalker",
                "height": "172",
                "mass": "77",
                "hair_color": "blond",
                "skin_color": "fair",
                "eye_color": "blue",
                "birth_year": "19BBY",
                "gender": "male",
                "homeworld": "https://swapi.py4e.com/api/planets/1/",
                "films": [
                    "https://swapi.py4e.com/api/films/1/",
                    "https://swapi.py4e.com/api/films/2/",
                    "https://swapi.py4e.com/api/films/3/",
                    "https://swapi.py4e.com/api/films/6/",
                    "https://swapi.py4e.com/api/films/7/"
                ],
                "species": [
                    "https://swapi.py4e.com/api/species/1/"
                ],
                "vehicles": [
                    "https://swapi.py4e.com/api/vehicles/14/",
                    "https://swapi.py4e.com/api/vehicles/30/"
                ],
                "starships": [
                    "https://swapi.py4e.com/api/starships/12/",
                    "https://swapi.py4e.com/api/starships/22/"
                ],
                "created": "2014-12-09T13:50:51.644000Z",
                "edited": "2014-12-20T21:17:56.891000Z",
                "url": "https://swapi.py4e.com/api/people/1/"
            }
        };

        axios.get.mockResolvedValue(mockResponse);

        const expectedData = {
            body: JSON.stringify({
                message: 'Datos de StarWars obtenidos correctamente',
                data: {
                    id: '1',
                    nombre: 'Luke Skywalker',
                    altura: '172',
                    peso: '77',
                    color_pelo: 'blond',
                    color_piel: 'fair',
                    color_ojos: 'blue',
                    anio_nacimiento: '19BBY',
                    genero: 'male',
                    planeta_natal: 'https://swapi.py4e.com/api/planets/1/',
                    peliculas: [
                        "https://swapi.py4e.com/api/films/1/",
                        "https://swapi.py4e.com/api/films/2/",
                        "https://swapi.py4e.com/api/films/3/",
                        "https://swapi.py4e.com/api/films/6/",
                        "https://swapi.py4e.com/api/films/7/"],
                    especie: ["https://swapi.py4e.com/api/species/1/"],
                    vehiculos: ["https://swapi.py4e.com/api/vehicles/14/",
                        "https://swapi.py4e.com/api/vehicles/30/"],
                    naves_estelares: ["https://swapi.py4e.com/api/starships/12/",
                        "https://swapi.py4e.com/api/starships/22/"],
                    creado: '2014-12-09T13:50:51.644000Z',
                    editado: '2014-12-20T21:17:56.891000Z',
                    url: 'https://swapi.py4e.com/api/people/1/'
                }
            }),
            statusCode: 200,
        };

        const result = await translatePeople();
        expect(result).toEqual(expectedData);
    });
});
