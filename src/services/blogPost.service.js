const { BlogPost, User, Category } = require('../models');

// const createPost = async (blogPost) => {
//   const { title, content, categoryIds } = blogPost;
//   const blogPostCreated = await BlogPost.create({ title, content, categoryIds });
//   return blogPostCreated;
// };

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

module.exports = {
  // createPost,
  getAllPosts,
};