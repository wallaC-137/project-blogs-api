const jwt = require('jsonwebtoken');

// refatorar esse middleware
const checkToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret);
    
    next();
  } catch (_err) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  checkToken,
};