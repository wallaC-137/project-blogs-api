const { Category } = require('../models');

const createCategory = async (category) => {
  try {
    const { name } = category;
    const categoryCreated = await Category.create({ name });
  
    if (!categoryCreated) {
      return { type: 400, message: 'Category already registered' };
    }
  
    return { type: 201, message: categoryCreated };
  } catch (err) {
    console.error(err);
  }
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  getAllCategories,
};