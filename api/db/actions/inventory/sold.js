const { getDatabase } = require('../../');

const execute = dto =>
  getDatabase().then(db => {
    const { storeId, shoeId } = dto.getData();

    const soldPath = `inventory.${storeId}.${shoeId}.sold`;

    return db
      .update(soldPath, n => n + 1)
      .write()
      .then(() => dto);
  });

module.exports = {
  execute,
};
