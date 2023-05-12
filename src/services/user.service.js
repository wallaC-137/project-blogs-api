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

module.exports = {
  registerUser,
};
