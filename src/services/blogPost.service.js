const { Op } = require('sequelize');

const { BlogPost, PostCategory } = require('../models');
const { attributesFields } = require('../utils');

const { getCategoryById } = require('./category.service');

const checkExists = async (id) => {
  try {
    const blogPost = await BlogPost.findOne({
      where: { id },
      include: [
        { ...attributesFields.fieldUser },
        { ...attributesFields.fieldCategory },
      ],
    });
    return blogPost;
  } catch (_err) {
    console.log('Server Error');
  }
};

const createPostValidation = async (blogPost) => {
  try {
    const { title, content, categoryIds } = blogPost;
   
    const { id } = await BlogPost.create({ title, content });
    categoryIds.forEach((categoryId) => {
      PostCategory.create({ postId: id, categoryId });
    });
    
    const blogPostCreated = await BlogPost.findOne({
      where: { id },
    });
    
    return blogPostCreated.dataValues;
  } catch (error) {
    console.log('Server Error');
    return {};
  }
};

const createPost = async (blogPost) => {
  const { title, content, categoryIds } = blogPost;

  const getCategories = await Promise.all(categoryIds
    .map((id) => getCategoryById(id)));

  if (getCategories.includes(null)) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
  }

  const blogPostCreated = await createPostValidation({ title, content, categoryIds });
  
  if (!blogPostCreated) {
    return { type: 400, message: 'Invalid fields' };
  }

  return { type: 201, message: blogPostCreated };
};

const getAllPosts = async () => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [
        { ...attributesFields.fieldUser },
        { ...attributesFields.fieldCategory },
      ],
    });
    return { type: 200, message: blogPosts };
  } catch (error) {
    console.log('Server Error');
  }
};

const getPostById = async (id) => {
  try {
    const blogPost = await checkExists(id);

    if (!blogPost) {
      return { type: 404, message: 'Post does not exist' };
    }

    return { type: 200, message: blogPost };
  } catch (error) {
    console.log('Server Error');
  }
};

const updatePost = async (id, title, content, userId) => {
  const blogPost = await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  if (!blogPost[0] === 0) {
    return { type: 404, message: 'Post does not exist' };
  }

  const response = await checkExists(id);

  if (response.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }

  return { type: 200, message: response };
};

const deletePost = async (id, userId) => {
  const response = await checkExists(id);
  if (!response) {
    return { type: 404, message: 'Post does not exist' };
  }

  const blogPost = await BlogPost.destroy({ where: { id, userId } });
  
  if (!blogPost) {
    return { type: 401, message: 'Unauthorized user' };
  }

  return { type: 204, message: '' };
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
      { ...attributesFields.fieldUser },
      { ...attributesFields.fieldCategory },
    ],
  });
  return { type: 200, message: blogPosts };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
  checkExists,
  createPostValidation,
};