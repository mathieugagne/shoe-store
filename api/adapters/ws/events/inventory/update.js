const extractFromPayload = require('../../../../libs/helpers/extractFromPayload');
const update = require('../../../../domain/inventory/update');

const execute = dto =>
  // TODO: add security, errorHandler e.g.
  // verifyAuthToken
  //   .execute(dto)
  //   .catch(handleError(dto));
  extractFromPayload
    .execute({ store: 'storeId', model: 'shoeId', inventory: 'quantity' })(dto)
    .then(extractFromPayload.execute())
    .then(update.execute);

module.exports = {
  execute,
};
