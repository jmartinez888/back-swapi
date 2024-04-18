const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Ruta para la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Resto de la configuración de tu aplicación...

app.listen(3001, () => {
    console.log('Servidor iniciado en http://localhost:3001');
});
