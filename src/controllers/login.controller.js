const { loginService } = require('../services');
const { generateToken } = require('../auth/generate.token');

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService.getByUsername(email, password);

  if (!result || result.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = generateToken(result);

  res.status(200).json({ token });
};

module.exports = {
  login,
};
