const dbStoreBrowse = require('../../db/actions/store/browse');

const execute = dto =>
  // TODO: add security, errorHandler, filtering e.g.
  // verifyAuthToken
  //   .execute(dto)
  //   .then(prepareFilteringQuery.execute)
  //   .then(dbStoreBrowse.execute)
  //   .catch(handleError(dto));

  dbStoreBrowse.execute(dto).then(() => {
    const { stores } = dto.getData();

    dto.response.setData(stores);

    return dto;
  });

module.exports = {
  execute,
};
