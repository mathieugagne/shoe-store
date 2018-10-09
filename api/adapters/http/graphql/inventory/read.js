const extractFromPayload = require('../../../../libs/helpers/extractFromPayload');
const read = require('../../../../domain/inventory/read');

const execute = dto =>
  // TODO: add security, errorHandler e.g.
  // verifyAuthToken
  //   .execute(dto)
  //   .catch(handleError(dto));
  extractFromPayload
    .execute(['storeId', 'shoeId'])(dto)
    .then(read.execute);

module.exports = {
  execute,
};
