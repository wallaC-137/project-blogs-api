const router = require('express').Router();
const { userController } = require('../controllers');
const { userValidation, tokenValidation } = require('../middlewares');

router.post('/', userValidation.mandatoryFields, userController.registerUser);
router.get('/', tokenValidation.checkToken, userController.getAllUsers);
router.get('/:id', tokenValidation.checkToken, userController.getUserById);
router.delete('/me', tokenValidation.checkToken, userController.deleteUser);

module.exports = router;