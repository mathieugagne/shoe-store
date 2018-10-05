const WebSocket = require('ws');
const createEventHandler = require('./createEventHandler');
const inventoryUpdate = require('../../domain/inventory/update');

function start() {
  // TODO: move this url to an environment variable
  const ws = new WebSocket('ws://localhost:8080/');

  ws.on('open', () => {
    console.log('Ready to listen for incoming messages!');
  });

  ws.on('error', error => {
    console.log('An error occured with the websocket adapter', error);
  });

  // The websocket should not be closed
  ws.on('close', () => {
    console.log(
      'The websocket connection adapter is close. We are going to try to reconnect in 5 secondes',
    );

    setTimeout(start, 5 * 1000);
  });

  ws.on('message', createEventHandler(inventoryUpdate.execute));
}

start();
