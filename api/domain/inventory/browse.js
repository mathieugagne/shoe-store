const dbInventoryBrowse = require('../../db/actions/inventory/browse');

const execute = dto =>
  dbInventoryBrowse.execute(dto).then(() => {
    const { inventory } = dto.getData();

    dto.response.setData(inventory);

    return dto;
  });

module.exports = {
  execute,
};
