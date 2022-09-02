const express = require('express');

const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(routes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
