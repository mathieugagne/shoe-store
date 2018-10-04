class Principal {
  constructor(principal = {}) {
    this.setUserId(principal.userId || null);
    this.setAuthToken(principal.authToken || null);
  }

  setUserId(userId) {
    this.userId = userId;
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
  }

  getUserId() {
    return this.userId;
  }

  getAuthToken() {
    return this.authToken;
  }
}

module.exports = Principal;
