const { Category } = require('../models');

const createCategory = async (category) => {
  try {
    const { name } = category;
    const categoryCreated = await Category.create({ name });
  
    if (!categoryCreated) {
      return { type: 400, message: 'Category already registered' };
    }
  
    return { type: 201, message: categoryCreated };
  } catch (_err) {
    console.error('Server Error');
  }
};

const getAllCategories = async () => {
  try {
    const categories = await Category.findAll();
    return { type: 200, message: categories };
  } catch (_err) {
    console.error('Server Error');
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};