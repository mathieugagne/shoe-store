const dbShoeBrowse = require('../../db/actions/shoe/browse');

const execute = dto =>
  // TODO: add security, errorHandler, filtering e.g.
  // verifyAuthToken
  //   .execute(dto)
  //   .then(prepareFilteringQuery.execute)
  //   .then(dbShoeBrowse.execute)
  //   .catch(handleError(dto));

  dbShoeBrowse.execute(dto).then(() => {
    const { shoes } = dto.getData();

    dto.response.setData(shoes);

    return dto;
  });

module.exports = {
  execute,
};
