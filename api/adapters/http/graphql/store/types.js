module.exports = `
  type Store {
    id: String!
    name: String!
  }

  type Query {
    stores: [Store]!
  }
`;
