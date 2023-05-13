const express = require('express');
const { loginController, userController, categoryController } = require('./controllers');
const { loginValidation, userValidation, tokenValidation } = require('./middlewares');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

app.get('/teste', tokenValidation.checkToken, (req, res) => {
  res.status(200).json({ message: 'ok' });
});
app.post('/login', loginValidation.mandatoryFields, loginController.login);
app.post('/user', userValidation.mandatoryFields, userController.registerUser);
app.get('/user', tokenValidation.checkToken, userController.getAllUsers);
app.get('/user/:id', tokenValidation.checkToken, userController.getUserById);
app.post(
'/categories', 
tokenValidation.checkToken,
userValidation.category, 
categoryController.createCategory,
);
app.get('/categories', tokenValidation.checkToken, categoryController.getAllCategories);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
