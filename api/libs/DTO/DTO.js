const get = require('lodash/get');
const Principal = require('./Principal');
const Request = require('./Request');
const Response = require('./Response');

class DTO {
  constructor(principal, request, response) {
    this.principal = new Principal(principal);
    this.request = new Request(request);
    this.response = new Response(response);
    this.data = {};
    this.raw = null;
  }

  // to remove raw key from console.log
  inspect() {
    return {
      principal: this.principal,
      request: this.request,
      response: this.response,
      data: this.data,
    };
  }

  setData(key, data) {
    this.data[key] = data;
  }

  getData(key) {
    return key ? get(this.data, key) : this.data;
  }

  setRaw(raw) {
    this.raw = raw;
  }

  getRaw() {
    return this.raw;
  }
}

module.exports = DTO;
