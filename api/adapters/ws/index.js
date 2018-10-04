const WebSocket = require('ws');
const createEventHandler = require('./createEventHandler');
const inventoryUpdate = require('../../domain/inventory/update');

// TODO: move this url to an environment variable
const ws = new WebSocket('ws://localhost:8080/');

ws.on('open', () => {
  console.log('Ready to listen for incoming messages!');
});

ws.on('message', createEventHandler(inventoryUpdate.execute));
