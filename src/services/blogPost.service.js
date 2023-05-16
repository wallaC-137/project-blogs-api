const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');

const getCategoryById = async (id) => {
  const category = await Category.findOne({ where: { id } });
  return category;
};

const createPost = async (blogPost) => {
  const { title, content, categoryIds } = blogPost;
  const { id } = await BlogPost.create({ title, content });
  categoryIds.forEach((categoryId) => {
    PostCategory.create({ postId: id, categoryId });
  });

  const blogPostCreated = await BlogPost.findOne({
    where: { id },
  });
  
  return blogPostCreated;
};

const getAllPosts = async () => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category,
            as: 'categories',
            through: { attributes: [] },
            attributes: ['id', 'name'] },
      ],
    });
    return blogPosts;
  } catch (error) {
    console.log(error);
  }
};

const getPostById = async (id) => {
  const blogPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category,
          as: 'categories',
          through: { attributes: [] },
          attributes: ['id', 'name'] },
    ],
  });
  return blogPost;
};

const updatePost = async (id, title, content) => {
  const blogPost = await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  return blogPost;
};

const deletePost = async (id, userId) => {
  const blogPost = await BlogPost.destroy({ where: { id, userId } });
  return blogPost;
};

const test = {
  fieldUser: { 
    model: User, as: 'user', attributes: { exclude: ['password'] }, 
  },
  fieldCategory: {
    model: Category, as: 'categories', through: { attributes: [] }, attributes: ['id', 'name'],
  },
};

const searchPost = async (searchTerm) => {
  const blogPosts = await BlogPost.findAll({
  where: { 
    [Op.or]: [
    { title: {
      [Op.like]: `%${searchTerm}%`,
    } },
    { content: {
      [Op.like]: `%${searchTerm}%`,
    } },
  ],

   },
    include: [
      { ...test.fieldUser },
      { ...test.fieldCategory },
    ],
  });
  return blogPosts;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
  getCategoryById,
};