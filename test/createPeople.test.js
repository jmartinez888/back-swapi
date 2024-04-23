const { createPeople } = require('../src/createPeople');
const dynamoDB = require('../src/dynamodb');

describe('createPeople', () => {
    it('crea una persona correctamente', async () => {
        const mockPut = jest.spyOn(dynamoDB, 'put').mockResolvedValue({});

        const event = {
            body: JSON.stringify({
                nombre: 'Juan',
                altura: '170',
                peso: '70',
                color_pelo: 'Negro',
                color_piel: 'Blanco',
                color_ojos: 'Café',
                fecha_nacimiento: '01-01-2000',
                genero: 'Masculino'
            })
        };

        const response = await createPeople(event);

        expect(mockPut).toHaveBeenCalled();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(JSON.parse(response.body)).toEqual({
            message: 'Persona creado correctamente',
            data: expect.objectContaining({
                nombre: 'Juan',
                altura: '170',
                peso: '70',
                color_pelo: 'Negro',
                color_piel: 'Blanco',
                color_ojos: 'Café',
                fecha_nacimiento: '01-01-2000',
                genero: 'Masculino'
            })
        });

        mockPut.mockRestore();
    });

});
