const express = require('express');
const { loginController, userController } = require('./controllers');
const { loginValidation, userValidation } = require('./middlewares');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

app.post('/login', loginValidation.mandatoryFields, loginController.login);
app.post('/user', userValidation.mandatoryFields, userController.registerUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
