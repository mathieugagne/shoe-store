const fs = require('fs');
const path = require('path');
const { getDatabase } = require('../');
const inventory = require('./inventory.json');
const shoes = require('./shoes.json');
const stores = require('./stores.json');

console.log('Start seeding...');

const dbPath = path.join(__dirname, '..', 'db.json');

fs.unlinkSync(dbPath);

getDatabase().then(db => {
  db.defaults({ inventory, inventoryLog: [], shoes, stores })
    .write()
    .then(() => {
      console.log('Seeding completed!');
    });
});
