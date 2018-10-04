const low = require('lowdb');
const path = require('path');
const FileAsync = require('lowdb/adapters/FileAsync');

let db;

const prepareDatabase = (forceCreationOfNewDb = false) => {
  if (db && !forceCreationOfNewDb) {
    return Promise.resolve(db);
  }

  const dbPath = path.join(__dirname, 'db.json');

  const adapter = new FileAsync(dbPath);
  return low(adapter).then(newDb => {
    db = newDb;

    return db;
  });
};

const getDatabase = () => {
  if (db) {
    return Promise.resolve(db);
  }

  return prepareDatabase();
};

module.exports = {
  getDatabase,
  prepareDatabase,
};
