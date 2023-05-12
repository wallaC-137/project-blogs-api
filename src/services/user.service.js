const { User } = require('../models');

const registerUser = async (user) => {
  const { displayName, email, password, image } = user;
  const userCreated = await User.create({
    displayName,
    email,
    password,
    image,
  });
  return userCreated;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

module.exports = {
  registerUser,
  getAllUsers,
};
