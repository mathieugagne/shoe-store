const extractFromPayload = require('../../libs/helpers/extractFromPayload');
const dbInventoryLogBrowse = require('../../db/actions/inventory/browseLog');

const execute = dto =>
  // TODO: add security, errorHandler, filtering e.g.
  // verifyAuthToken
  //   .execute(dto)
  //   .then(prepareFilteringQuery.execute)
  //   .then(dbInventoryBrowse.execute)
  //   .catch(handleError(dto));

  extractFromPayload
    .execute('limit')(dto)
    .then(dbInventoryLogBrowse.execute)
    .then(() => {
      const { inventoryLogs } = dto.getData();

      dto.response.setData(inventoryLogs);

      return dto;
    });

module.exports = {
  execute,
};
