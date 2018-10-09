const dbShoeBrowse = require('../../db/actions/shoe/browse');

const execute = dto =>
  dbShoeBrowse.execute(dto).then(() => {
    const { shoes } = dto.getData();

    dto.response.setData(shoes);

    return dto;
  });

module.exports = {
  execute,
};
