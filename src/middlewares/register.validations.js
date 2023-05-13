const { loginService } = require('../services');

const checkName = (value) => value && value.length < 8;
const checkEmail = (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const checkPassword = (value) => value.length < 6;
const checkEmailExists = async (value) => loginService.getByUsername(value);

const mandatoryFields = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (checkName(displayName)) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  if (checkEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (checkPassword(password)) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }

  if (await checkEmailExists(email)) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

const category = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  next();
};

module.exports = {
  mandatoryFields,
  category,
};
