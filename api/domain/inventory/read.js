const extractFromPayload = require('../../libs/helpers/extractFromPayload');
const dbInventoryRead = require('../../db/actions/inventory/read');

const execute = dto =>
  extractFromPayload
    .execute(['storeId', 'shoeId'])(dto)
    .then(dbInventoryRead.execute)
    .then(() => {
      const { storeInventory } = dto.getData();

      dto.response.setData(storeInventory);

      return dto;
    });

module.exports = {
  execute,
};
