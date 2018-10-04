const inventoryBrowse = require('../../../../domain/inventory/browse');
const inventoryBrowseLog = require('../../../../domain/inventory/browseLog');
const inventoryRead = require('../../../../domain/inventory/read');
const createResolver = require('../createResolver');

module.exports = {
  // Query
  globalInventory: createResolver(inventoryBrowse.execute),
  storeInventory: createResolver(inventoryRead.execute),
  inventoryLogs: createResolver(inventoryBrowseLog.execute),
};
