class Response {
  constructor(response = {}) {
    this.data = response.data || null;

    this.errors = response.errors || [];
  }

  setData(data) {
    this.data = data;
  }

  addError(
    message = 'An error occurred.',
    type = 'unknown',
    description = '',
    meta = null,
    originalError = null,
  ) {
    this.errors = this.errors || [];
    this.errors.push({ message, type, description, meta, originalError });
  }

  getData() {
    return this.data;
  }

  getErrors() {
    return this.errors;
  }

  hasErrors() {
    return Boolean(this.errors && this.errors.length);
  }
}

module.exports = Response;
