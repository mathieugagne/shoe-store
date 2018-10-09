const extractFromPayload = require('../../../../libs/helpers/extractFromPayload');
const browseLog = require('../../../../domain/inventory/browseLog');

const execute = dto =>
  // TODO: add security, errorHandler, filtering e.g.
  // verifyAuthToken
  //   .execute(dto)
  //   .then(prepareFilteringQuery.execute)
  //   .catch(handleError(dto));
  extractFromPayload
    .execute('limit')(dto)
    .then(browseLog.execute);

module.exports = {
  execute,
};
