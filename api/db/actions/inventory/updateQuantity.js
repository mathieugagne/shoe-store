const { getDatabase } = require('../../');

const execute = dto =>
  getDatabase().then(db => {
    const { storeId, shoeId, quantity } = dto.getData();

    const quantityPath = `inventory.${storeId}.${shoeId}.quantity`;

    return db
      .set(quantityPath, quantity)
      .write()
      .then(() => dto);
  });

module.exports = {
  execute,
};
