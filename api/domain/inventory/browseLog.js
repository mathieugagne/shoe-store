const dbInventoryLogBrowse = require('../../db/actions/inventory/browseLog');

const execute = dto =>
  dbInventoryLogBrowse.execute(dto).then(() => {
    const { inventoryLogs } = dto.getData();

    dto.response.setData(inventoryLogs);

    return dto;
  });

module.exports = {
  execute,
};
