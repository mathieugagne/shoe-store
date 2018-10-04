const { getDatabase } = require('../../');

const execute = dto =>
  getDatabase().then(db => {
    const { store, model, inventory } = dto.getData();

    return db
      .get('inventoryLog')
      .push({ store, model, inventory, createdAt: Date.now() })
      .write()
      .then(() => dto);
  });

module.exports = {
  execute,
};
