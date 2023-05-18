const { blogPostService } = require('../services');
const { verifyToken } = require('../auth/generate.token');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const getCategories = await Promise.all(categoryIds
    .map((id) => blogPostService.getCategoryById(id)));

  if (getCategories.includes(null)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const blogPost = await blogPostService.createPost({ title, content, categoryIds });

  if (!blogPost) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const { userId } = verifyToken(authorization);

  res.status(201).json({ ...blogPost.dataValues, userId });
};

const getAllPosts = async (_req, res) => {
  const blogPosts = await blogPostService.getAllPosts();

  res.status(200).json(blogPosts);
  res.status(200).end();
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const blogPost = await blogPostService.getPostById(id);

  if (!blogPost) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  res.status(200).json(blogPost);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { authorization } = req.headers;

  const blogPost = await blogPostService.updatePost(id, title, content);

  const { userId } = verifyToken(authorization);

  if (!blogPost[0] === 0) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  const response = await blogPostService.getPostById(id);

  if (response.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  res.status(200).json(response);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { userId } = verifyToken(authorization);
  
  const response = await blogPostService.getPostById(id);

  if (!response) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  // if (response.userId !== userId) {
  //   // console.log('Unauthorized user');
  //   console.log('entrou aqui');
  //   return res.status(401).json({ message: 'Unauthorized user' });
  // }
  
  const blogPost = await blogPostService.deletePost(id, userId);

  console.log(blogPost === 0);
  
  if (!blogPost) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  res.status(204).end();
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  console.log(true, 'aqui está ---------------- ', q);
  const blogPosts = await blogPostService.searchPost(q);

  res.status(200).json(blogPosts);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};