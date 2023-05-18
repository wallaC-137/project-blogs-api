const router = require('express').Router();
const { userController } = require('../controllers');
const { loginValidation } = require('../middlewares');

router.post(
  '/',
  loginValidation.inputFields,
  userController.getByEmail,
);

module.exports = router;
