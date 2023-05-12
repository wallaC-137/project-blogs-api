const jwt = require('jsonwebtoken');
const { loginService } = require('../services');

const secret = process.env.JWT_SECRET || 'tokenexample';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService.getByUsername(email, password);

  if (!result || result.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = jwt.sign({ data: { userId: result.id } }, secret, jwtConfig);

  res.status(200).json({ token });
};

module.exports = {
  login,
};
