const loginValidation = require('./login.validations');
const userValidation = require('./register.validations');
const tokenValidation = require('./token.validations');
const updateValidation = require('./update.validations');
const categoryValidation = require('./category.validations');
const createPostValidation = require('./createPost.validations');

module.exports = {
  loginValidation,
  userValidation,
  tokenValidation,
  updateValidation,
  categoryValidation,
  createPostValidation,
};
