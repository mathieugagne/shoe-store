const shoes = require('../../data/shoes.json');

const execute = dto => {
  dto.setData('shoes', shoes);

  return Promise.resolve(dto);
};

module.exports = {
  execute,
};
