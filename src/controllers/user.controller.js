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

const getAllUsers = async (_req, res) => {
  const users = await userServices.getAllUsers();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userServices.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  res.status(200).json(user);
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
};
