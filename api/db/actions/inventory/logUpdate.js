const uuid = require('uuid/v4');
const { getDatabase } = require('../../');

const execute = dto =>
  getDatabase().then(db => {
    const { store, model, inventory } = dto.getData();

    return db
      .get('inventoryLog')
      .push({ id: uuid(), store, model, inventory, createdAt: Date.now() })
      .write()
      .then(() => dto);
  });

module.exports = {
  execute,
};
