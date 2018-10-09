const dbStoreBrowse = require('../../db/actions/store/browse');

const execute = dto =>
  dbStoreBrowse.execute(dto).then(() => {
    const { stores } = dto.getData();

    dto.response.setData(stores);

    return dto;
  });

module.exports = {
  execute,
};
