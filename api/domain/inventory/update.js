const dbInventorySold = require('../../db/actions/inventory/sold');
const dbInventoryUpdateQuantity = require('../../db/actions/inventory/updateQuantity');
const dbInventoryLogUpdate = require('../../db/actions/inventory/logUpdate');

const execute = dto =>
  dbInventorySold
    .execute(dto)
    .then(dbInventoryUpdateQuantity.execute)
    .then(dbInventoryLogUpdate.execute)
    .then(() => {
      dto.response.setData(true);

      return dto;
    });

module.exports = {
  execute,
};
