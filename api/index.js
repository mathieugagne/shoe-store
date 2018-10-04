const { prepareDatabase } = require('./db');

const ADAPTER = process.env.ADAPTER || 'http';

console.log(`Starting ${ADAPTER} api`);

prepareDatabase().then(() => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  require(`./adapters/${ADAPTER}`);
});
