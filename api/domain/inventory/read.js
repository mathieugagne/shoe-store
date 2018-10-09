const dbInventoryRead = require('../../db/actions/inventory/read');

const execute = dto =>
  dbInventoryRead.execute(dto).then(() => {
    const { storeInventory } = dto.getData();

    dto.response.setData(storeInventory);

    return dto;
  });

module.exports = {
  execute,
};
