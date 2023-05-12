const { userServices } = require('../services');
const generateToken = require('../jwt/generate.token');

const registerUser = async (req, res) => {
  const { email, password, displayName, image } = req.body;
  const user = await userServices.registerUser({
    displayName,
    email,
    password,
    image,
  });
  const token = generateToken(user);
  res.status(201).json({ token });
};

module.exports = {
  registerUser,
};
