const dbInventoryBrowse = require('../../db/actions/inventory/browse');

const execute = dto =>
  // TODO: add security, errorHandler, filtering e.g.
  // verifyAuthToken
  //   .execute(dto)
  //   .then(prepareFilteringQuery.execute)
  //   .then(dbInventoryBrowse.execute)
  //   .catch(handleError(dto));

  dbInventoryBrowse.execute(dto).then(() => {
    const { inventory } = dto.getData();

    dto.response.setData(inventory);

    return dto;
  });

module.exports = {
  execute,
};
