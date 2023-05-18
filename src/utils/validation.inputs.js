const mandatoryFields = (input, request) => input.some((field) => !request[field]);

module.exports = {
  mandatoryFields,
};