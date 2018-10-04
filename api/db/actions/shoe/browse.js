const { getDatabase } = require('../../');

const execute = dto =>
  getDatabase().then(db => {
    const shoes = Object.values(db.get('shoes').value());

    dto.setData('shoes', shoes);

    return Promise.resolve(dto);
  });

module.exports = {
  execute,
};
