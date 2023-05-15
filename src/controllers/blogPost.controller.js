const { blogPostService } = require('../services');

// const createPost = async (req, res) => {
//   const { title, content, categoryIds } = req.body;
//   const { id } = req.user;
//   console.log(id);
//   const blogPost = await blogPostService.createPost({ title, content, categoryIds });

//   if (!blogPost) {
//     return res.status(400).json({ message: 'Invalid fields' });
//   }

//   res.status(201).json(blogPost);
// };

const getAllPosts = async (_req, res) => {
  const blogPosts = await blogPostService.getAllPosts();

  res.status(200).json(blogPosts);
  res.status(200).end();
};

module.exports = {
  // createPost,
  getAllPosts,
};