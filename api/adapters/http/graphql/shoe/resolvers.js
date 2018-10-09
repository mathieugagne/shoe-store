const shoeBrowse = require('./browse');
const createResolver = require('../createResolver');

module.exports = {
  // Query
  shoes: createResolver(shoeBrowse.execute),
};
