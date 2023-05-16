const { userServices } = require('../services');
const { generateToken, verifyToken } = require('../auth/generate.token');

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

const deleteUser = async (req, res) => {
  const { authorization } = req.headers;

  const { userId } = verifyToken(authorization).data;

  const user = await userServices.deleteUser(userId);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  res.status(204).end();
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
