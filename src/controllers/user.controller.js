const { userServices } = require('../services');
const { generateToken, verifyToken } = require('../auth/generate.token');

const registerUser = async (req, res) => {
  const { email, password, displayName, image } = req.body;
  const { type, message } = await userServices.registerUser({
    displayName,
    email,
    password,
    image,
  });

  if (type === 409) {
    return res.status(type).json({ message });
  }

  const token = generateToken(message);
  res.status(type).json({ token });
};

const getAllUsers = async (_req, res) => {
  const { type, message } = await userServices.getAllUsers();
  res.status(type).json(message);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userServices.getUserById(id);

  if (type === 404) {
    return res.status(type).json({ message });
  }

  res.status(type).json(message);
};

const deleteUser = async (req, res) => {
  const { authorization } = req.headers;

  const { userId } = verifyToken(authorization);

  const { type, message } = await userServices.deleteUser(userId);

  if (type === 404) {
    return res.status(type).json({ message });
  }

  res.status(type).end();
};

const getByEmail = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await userServices.getByEmail(email, password);

  if (type === 400) {
    return res.status(type).json({ message });
  }

  res.status(type).json({ token: message });
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
  getByEmail,
};
