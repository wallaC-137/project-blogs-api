const router = require('express').Router();
const { categoryController } = require('../controllers');
const { tokenValidation, categoryValidation } = require('../middlewares');

router.post(
  '/', 
  tokenValidation.checkToken, 
  categoryValidation.inputFields,
  categoryController.createCategory,
);
router.get(
  '/',
  tokenValidation.checkToken,
  categoryController.getAllCategories,
);

module.exports = router;