const { getDatabase } = require('../../');

const execute = dto =>
  getDatabase().then(db => {
    const { limit = 10 } = dto.getData();

    const inventoryLogs = db
      .get('inventoryLog')
      .orderBy('createdAt', 'desc')
      .take(limit)
      .value()
      .map(log =>
        Object.assign({}, log, {
          createdAt: new Date(log.createdAt).toUTCString(),
        }),
      );

    dto.setData('inventoryLogs', inventoryLogs);

    return Promise.resolve(dto);
  });

module.exports = {
  execute,
};
