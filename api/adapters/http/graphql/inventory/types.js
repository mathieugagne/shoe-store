module.exports = `
  type ShoeInventory {
    shoeId: String!
    quantity: Int!
    sold: Int!
  }

  type StoreInventory {
    storeId: String!
    inventory: [ShoeInventory]!
  }

  type InventoryLog {
    store: String!
    model: String!
    inventory: Int!
    createdAt: String!
  }

  type Query {
    globalInventory: [StoreInventory]!
    storeInventory(storeId: String!, shoeId: String): StoreInventory
    inventoryLogs(limit: Int): [InventoryLog]!
  }
`;
