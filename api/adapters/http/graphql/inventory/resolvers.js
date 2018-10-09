const inventoryBrowse = require('./browse');
const inventoryBrowseLog = require('./browseLog');
const inventoryRead = require('./read');
const createResolver = require('../createResolver');

module.exports = {
  // Query
  globalInventory: createResolver(inventoryBrowse.execute),
  storeInventory: createResolver(inventoryRead.execute),
  inventoryLogs: createResolver(inventoryBrowseLog.execute),
};
