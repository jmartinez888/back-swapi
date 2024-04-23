const { getPeople } = require('../src/getPeople');
const dynamoDB = require('../src/dynamodb');

describe('getPeople', () => {
    it('devuelve la lista de personas correctamente', async () => {
        const mockScan = jest.spyOn(dynamoDB, 'scan').mockResolvedValue([
            {
                nombre: { S: 'Jefferson' },
                peso: { S: '60' },
                fecha_nacimiento: { S: '112BBY' },
                color_pelo: { S: 'negro' },
                createAt: { M: {} },
                altura: { S: '167' },
                color_piel: { S: 'clara' },
                id: { S: '2a071a84-42cc-4c41-afcb-868b9f873c15' },
                color_ojos: { S: 'marrones' },
                genero: { S: 'n/a' }
            },
            // Añade aquí los demás elementos de la lista
        ]);

        const response = await getPeople();

        expect(mockScan).toHaveBeenCalled();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(JSON.parse(response.body)).toEqual({
            message: 'Listando Personas',
            data: expect.arrayContaining([
                {
                    nombre: expect.objectContaining({ S: 'Jefferson' }),
                    peso: expect.objectContaining({ S: '60' }),
                    fecha_nacimiento: expect.objectContaining({ S: '112BBY' }),
                    color_pelo: expect.objectContaining({ S: 'negro' }),
                    createAt: expect.any(Object), // Puedes verificar más específicamente la estructura de createAt si es necesario
                    altura: expect.objectContaining({ S: '167' }),
                    color_piel: expect.objectContaining({ S: 'clara' }),
                    id: expect.any(Object), // Puedes verificar más específicamente la estructura de id si es necesario
                    color_ojos: expect.objectContaining({ S: 'marrones' }),
                    genero: expect.objectContaining({ S: 'n/a' })
                },
                // Añade aquí las expectativas para los demás elementos de la lista
            ])
        });

        mockScan.mockRestore();
    });


    // it('maneja una lista de personas vacía', async () => {
    //     const mockScan = jest.spyOn(dynamoDB, 'scan').mockResolvedValue([]);

    //     const response = await getPeople();

    //     expect(mockScan).toHaveBeenCalled();
    //     expect(response.statusCode).toBe(404);
    //     expect(response.body).toBeDefined();
    //     expect(JSON.parse(response.body)).toEqual({
    //         message: 'Lista de Personas vacia'
    //     });

    //     mockScan.mockRestore();
    // });

    // it('maneja errores correctamente', async () => {
    //     const mockScan = jest.spyOn(dynamoDB, 'scan').mockRejectedValue(new Error('Error en DynamoDB'));

    //     const response = await getPeople();

    //     expect(mockScan).toHaveBeenCalled();
    //     expect(response.statusCode).toBe(500);
    //     expect(response.body).toBeDefined();
    //     expect(JSON.parse(response.body)).toEqual({
    //         message: 'Error al procesar la solicitud',
    //         error: 'Error en DynamoDB'
    //     });

    //     mockScan.mockRestore();
    // });
});
