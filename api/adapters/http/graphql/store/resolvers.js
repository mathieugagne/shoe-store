const storeBrowse = require('../../../../domain/store/browse');
const createResolver = require('../createResolver');

module.exports = {
  // Query
  stores: createResolver(storeBrowse.execute),
};
