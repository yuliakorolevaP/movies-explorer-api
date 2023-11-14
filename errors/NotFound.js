const { statusCode } = require('../utils/constants');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.NotFound;
  }
}
module.exports = NotFound;
