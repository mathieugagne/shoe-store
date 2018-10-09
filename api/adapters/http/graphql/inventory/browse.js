const browse = require('../../../../domain/inventory/browse');

const execute = dto =>
  // TODO: add security, errorHandler, filtering e.g.
  // verifyAuthToken
  //   .execute(dto)
  //   .then(prepareFilteringQuery.execute)
  //   .catch(handleError(dto));
  browse.execute(dto);

module.exports = {
  execute,
};
