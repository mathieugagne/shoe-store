module.exports = `
  type Shoe {
    id: String!
    name: String!
  }
  type Query {
    shoes: [Shoe]!
  }
`;
