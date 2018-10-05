const { prepareDatabase } = require('./db');

console.log(`Starting api`);

prepareDatabase().then(() => {
  // Due to a database limitation we must run both adapters
  // at the same time, because lowdb keep the data in memory
  // so if a change happen from an other process it won't be
  // aware of the change unless we call `db.read()`
  // see: https://github.com/typicode/lowdb#api

  /* eslint-disable global-require, import/no-dynamic-require */
  require(`./adapters/http`);
  require(`./adapters/ws`);
  /* eslint-enable */
});
