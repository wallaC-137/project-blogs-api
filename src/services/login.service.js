const { User } = require('../models');
// const { status, message } = require('../utils');

const getByUsername = (email) => User.findOne({ where: { email } });

module.exports = {
  getByUsername,
};
