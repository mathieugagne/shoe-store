/* eslint-disable import/no-extraneous-dependencies */
const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/graphql', { target: 'http://localhost:8081/graphql' }));
};
