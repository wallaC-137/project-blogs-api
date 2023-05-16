const router = require('express').Router();
const { loginController } = require('../controllers');
const { loginValidation } = require('../middlewares');

router.post('/', loginValidation.mandatoryFields, loginController.login);

module.exports = router;
