const { blogPostService } = require('../services');
const { verifyToken } = require('../auth/generate.token');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;

  const { type, message } = await blogPostService.createPost({ title, content, categoryIds });

  if (type !== 201) {
    return res.status(type).json({ message });
  }

  const { userId } = verifyToken(authorization);

  res.status(201).json({ ...message, userId });
};

const getAllPosts = async (_req, res) => {
  const { type, message } = await blogPostService.getAllPosts();

  res.status(type).json(message);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await blogPostService.getPostById(id);

  if (type === 404) {
    return res.status(type).json({ message });
  }

  res.status(type).json(message);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { authorization } = req.headers;

  const { userId } = verifyToken(authorization);

  const { type, message } = await blogPostService.updatePost(id, title, content, userId);

  if (type !== 200) {
    return res.status(type).json({ message });
  }

  res.status(type).json(message);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { userId } = verifyToken(authorization);

  const { type, message } = await blogPostService.deletePost(id, userId);
  
  if (type !== 204) {
    return res.status(type).json({ message });
  }

  res.status(type).end();
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await blogPostService.searchPost(q);

  res.status(type).json(message);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};