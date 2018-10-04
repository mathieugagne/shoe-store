const { getDatabase } = require('../../');

const execute = dto =>
  getDatabase().then(db => {
    const rawInventory = db.get('inventory').value();

    const inventory = Object.keys(rawInventory).map(storeId => {
      const storeInventory = rawInventory[storeId];

      return {
        storeId,
        inventory: Object.keys(storeInventory).map(shoeId =>
          Object.assign({}, storeInventory[shoeId], { shoeId }),
        ),
      };
    });

    dto.setData('inventory', inventory);

    return Promise.resolve(dto);
  });

module.exports = {
  execute,
};
