const router = require('express').Router();
const { categoryController } = require('../controllers');
const { tokenValidation, userValidation } = require('../middlewares');

router.post(
  '/', 
  tokenValidation.checkToken, 
  userValidation.category,
  categoryController.createCategory,
);
router.get(
  '/',
  tokenValidation.checkToken,
  categoryController.getAllCategories,
);

module.exports = router;