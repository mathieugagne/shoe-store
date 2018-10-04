const stores = require('../../data/stores.json');

const execute = dto => {
  dto.setData('stores', stores);

  return Promise.resolve(dto);
};

module.exports = {
  execute,
};
