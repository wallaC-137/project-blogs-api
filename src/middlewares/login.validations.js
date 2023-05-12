const mandatoryFields = (req, res, next) => {
  const request = req.body;
  const requiredFields = ['email', 'password'];

  const isMissingFields = requiredFields.some((field) => !request[field]);
  if (isMissingFields) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = {
  mandatoryFields,
};
