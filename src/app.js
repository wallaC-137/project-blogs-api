const express = require('express');
const loginRouter = require('./router');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRouter.loginRouter);
app.use('/user', loginRouter.usersRouter);
app.use('/post', loginRouter.postsRouter);
app.use('/categories', loginRouter.categoriesRouter);

module.exports = app;
