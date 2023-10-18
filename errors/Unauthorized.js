const { statusCode } = require('../utils/constants');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.Unauthorized;
  }
}
module.exports = Unauthorized;
