const { Category } = require('../models');

const createCategory = async (category) => {
  const { name } = category;
  const categoryCreated = await Category.create({ name });
  return categoryCreated;
};

module.exports = {
  createCategory,
};