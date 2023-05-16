const jwt = require('jsonwebtoken');

// const secret = process.env.JWT_SECRET || 'tokenexample';
const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign({ data: { userId: payload.id } }, secret, jwtConfig);

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
  
    return decoded;
  } catch (error) {
    console.log('token error');
  }
};

module.exports = { 
  generateToken,
  verifyToken,
 };