const get = require('lodash/get');

class Request {
  constructor(request = {}) {
    this.setPayload(request.payload || {});
  }

  setPayload(payload) {
    this.payload = Object.assign({}, this.payload || {}, payload);
  }

  getPayload(key) {
    return key ? get(this.payload, key) : this.payload;
  }
}

module.exports = Request;
