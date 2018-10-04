const { getDatabase } = require('../../');

const execute = dto =>
  getDatabase().then(db => {
    const { storeId, shoeId } = dto.getData();

    let storeInventory;
    if (shoeId) {
      const storeShoeInventoryPath = `inventory.${storeId}.${shoeId}`;
      const storeShoeInventory = db.get(storeShoeInventoryPath).value();

      storeInventory = {
        storeId,
        inventory: [Object.assign({}, storeShoeInventory, { shoeId })],
      };
    } else {
      const storeInventoryPath = `inventory.${storeId}`;
      const rawStoreInventory = db.get(storeInventoryPath).value();

      storeInventory = {
        storeId,
        inventory: Object.keys(rawStoreInventory).map(id =>
          Object.assign({}, rawStoreInventory[id], { shoeId: id }),
        ),
      };
    }

    dto.setData('storeInventory', storeInventory);

    return Promise.resolve(dto);
  });

module.exports = {
  execute,
};
