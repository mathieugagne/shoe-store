const { getDatabase } = require('../../');

const execute = dto =>
  getDatabase().then(db => {
    const stores = Object.values(db.get('stores').value());

    dto.setData('stores', stores);

    return Promise.resolve(dto);
  });

module.exports = {
  execute,
};
