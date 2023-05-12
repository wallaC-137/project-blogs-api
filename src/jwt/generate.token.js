const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'tokenexample';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign({ data: { userId: payload.id } }, secret, jwtConfig);

  return token;
};

module.exports = generateToken;