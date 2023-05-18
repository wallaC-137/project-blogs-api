const { validationInputs } = require('../utils'); 

const inputFields = (req, res, next) => {
  const request = req.body;
  const inputs = ['email', 'password'];

  const isMissingFields = validationInputs.mandatoryFields(inputs, request);
  if (isMissingFields) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }

  next();
};

// inputFields

module.exports = {
  inputFields,
};
