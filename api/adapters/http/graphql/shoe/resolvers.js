const shoeBrowse = require('../../../../domain/shoe/browse');
const createResolver = require('../createResolver');

module.exports = {
  // Query
  shoes: createResolver(shoeBrowse.execute),
};
