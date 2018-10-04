const extractFromPayload = require('../../libs/helpers/extractFromPayload');
const dbInventorySold = require('../../db/actions/inventory/sold');
const dbInventoryUpdateQuantity = require('../../db/actions/inventory/updateQuantity');
const dbInventoryLogUpdate = require('../../db/actions/inventory/logUpdate');

const execute = dto =>
  // TODO: add security, errorHandler e.g.
  // verifyAuthToken
  //   .execute(dto)
  //   ...
  //   .catch(handleError(dto));
  extractFromPayload
    .execute({ store: 'storeId', model: 'shoeId' })(dto)
    .then(dbInventorySold.execute)
    .then(extractFromPayload.execute({ inventory: 'quantity' }))
    .then(dbInventoryUpdateQuantity.execute)
    .then(extractFromPayload.execute())
    .then(dbInventoryLogUpdate.execute);

module.exports = {
  execute,
};
