const { Category } = require('../models');

const createCategory = async (category) => {
  const { name } = category;
  const categoryCreated = await Category.create({ name });
  return categoryCreated;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  getAllCategories,
};