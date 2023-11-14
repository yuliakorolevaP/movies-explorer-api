const { statusCode } = require('../utils/constants');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.BadRequest;
  }
}
module.exports = BadRequest;
