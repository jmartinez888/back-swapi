
'use strict';

const axios = require('axios');

const fetchPeopleData = async () => {
    try {
        const response = await axios.get('https://swapi.py4e.com/api/people/1/');
        const data = response.data;

        return {
            id: data.url.split('/')[5],
            nombre: data.name,
            altura: data.height,
            peso: data.mass,
            color_pelo: data.hair_color,
            color_piel: data.skin_color,
            color_ojos: data.eye_color,
            anio_nacimiento: data.birth_year,
            genero: data.gender,
            planeta_natal: data.homeworld,
            peliculas: data.films,
            especie: data.species,
            vehiculos: data.vehicles,
            naves_estelares: data.starships,
            creado: data.created,
            editado: data.edited,
            url: data.url,

        };
    } catch (error) {
        console.error('Error fetching StarWars data:', error);
        throw error;
    }
};

module.exports.translatePeople = async (event) => {
    try {
        const starWarsData = await fetchPeopleData();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Datos de StarWars obtenidos correctamente',
                data: starWarsData
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error al obtener datos de StarWars',
                error: error.message
            }),
        };
    }
};