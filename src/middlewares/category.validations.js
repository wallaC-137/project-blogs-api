const { validationInputs } = require('../utils');

const inputFields = (req, res, next) => {
  const request = req.body;
  const inputs = ['name'];

  if (validationInputs.mandatoryFields(inputs, request)) {
    return res.status(400).json({ message: '"name" is required' });
  }

  next();
};

module.exports = {
  inputFields,
};