const router = require('express').Router();
const { blogPostController } = require('../controllers');
const { tokenValidation, updateValidation, createPostValidation } = require('../middlewares');

router.post(
  '/',
  tokenValidation.checkToken,
  createPostValidation.inputFields,
  blogPostController.createPost,
);
router.get(
  '/',
  tokenValidation.checkToken,
  blogPostController.getAllPosts,
);
router.get(
  '/search',
  tokenValidation.checkToken,
  blogPostController.searchPost,
);
router.get(
  '/:id',
  tokenValidation.checkToken,
  blogPostController.getPostById,
);
router.put(
  '/:id', 
  tokenValidation.checkToken,
  updateValidation.keys,
  blogPostController.updatePost,
);
router.delete(
  '/:id',
  tokenValidation.checkToken,
  blogPostController.deletePost,
);

module.exports = router;