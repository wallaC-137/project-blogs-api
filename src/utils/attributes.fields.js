const { User, Category } = require('../models');

module.exports = {
  fieldUser: { 
    model: User, as: 'user', attributes: { exclude: ['password'] }, 
  },
  fieldCategory: {
    model: Category, as: 'categories', through: { attributes: [] }, attributes: ['id', 'name'],
  },
};
