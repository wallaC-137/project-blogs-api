const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await categoryService.createCategory({ name });

  res.status(type).json(message);
};

const getAllCategories = async (_req, res) => {
  const categories = await categoryService.getAllCategories();

  res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};