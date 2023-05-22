// const { body, validationResult } = require('express-validator');
const { validationInputs } = require('../utils');

const inputFields = async (req, res, next) => {
  const requests = req.body;
  const inputs = ['title', 'content', 'categoryIds'];

  const isOk = validationInputs.mandatoryFields(inputs, requests);
  
  if (isOk) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = {
  inputFields,
};