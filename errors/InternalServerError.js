const { statusCode } = require('../utils/constants');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.InternalServerError;
  }
}
module.exports = InternalServerError;
