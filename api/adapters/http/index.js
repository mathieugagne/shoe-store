const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { types, resolvers } = require('./graphql');

const app = express();
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST'],
  }),
);
app.set('etag', false);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    strict: true,
    type: ['application/json', 'application/graphql'],
    limit: '4096kb',
  }),
);

// ensure nothing from here is cached
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  res.set('Expires', 'Wed, 2 Mar 1994 12:00:00 GMT');
  next();
});

const schema = buildSchema(types);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: process.env.NODE_ENV !== 'production',
  }),
);

// start the http server
const PORT = 8081; // TODO: use env variable!
const server = http.createServer(app);
server.listen(PORT, err => {
  if (err) {
    console.error(err, 'API failed to start');
  } else {
    console.log(`API started on port ${PORT}`);
  }
});

module.exports = server;
