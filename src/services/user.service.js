const { User } = require('../models');
const { generateToken } = require('../auth/generate.token');

const registerUser = async (user) => {
  try {
    const { displayName, email, password, image } = user;
    const userCreated = await User.create({
      displayName,
      email,
      password,
      image,
    });

    return { type: 201, message: userCreated };
  } catch (_err) {
    return { type: 409, message: 'User already registered' };
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
  
    return { type: 200, message: users };
  } catch (_err) {
    console.log('Error');
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  
    if (!user) {
      return { type: 404, message: 'User does not exist' };
    }
  
    return { type: 200, message: user };
  } catch (err) {
    console.log('Error');
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.destroy({ where: { id } });
  
    if (!user) {
      return { type: 404, message: 'User does not exist' };
    }
  
    return { type: 204, message: '' };
  } catch (err) {
    console.log('Error');
  }
};

const getByEmail = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
  
    if (!user || user.password !== password) {
      return { type: 400, message: 'Invalid fields' };
    }
  
    const token = generateToken(user);
  
    return { type: 200, message: token };
  } catch (error) {
    console.log('Error');
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
  getByEmail,
};
