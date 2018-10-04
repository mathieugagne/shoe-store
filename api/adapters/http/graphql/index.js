const path = require('path');
const {
  fileLoader,
  mergeResolvers,
  mergeTypes,
} = require('merge-graphql-schemas');

const resolversArray = fileLoader(path.join(__dirname, './**/resolvers.js'));
const typesArray = fileLoader(path.join(__dirname, './**/types.js'));

module.exports = {
  resolvers: mergeResolvers(resolversArray),
  types: mergeTypes(typesArray),
};
