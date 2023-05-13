const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await categoryService.createCategory({ name });

  if (!category) {
    return res.status(400).json({ message: 'Category already registered' });
  }

  res.status(201).json(category);
};

module.exports = {
  createCategory,
};