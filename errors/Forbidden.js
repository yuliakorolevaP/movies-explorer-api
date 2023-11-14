const { statusCode } = require('../utils/constants');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.Forbidden;
  }
}
module.exports = Forbidden;
