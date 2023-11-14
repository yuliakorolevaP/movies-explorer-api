const { statusCode } = require('../utils/constants');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.Conflict;
  }
}
module.exports = Conflict;
