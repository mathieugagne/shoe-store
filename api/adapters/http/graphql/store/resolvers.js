const storeBrowse = require('./browse');
const createResolver = require('../createResolver');

module.exports = {
  // Query
  stores: createResolver(storeBrowse.execute),
};
