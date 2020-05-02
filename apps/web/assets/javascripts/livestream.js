var ws = new WebSocket('ws://localhost:8080/inventory');

ws.onmessage = function(event) {
  displayStockInformation();
};

ws.onclose = function(event) {
  unableToConnectMessage()
};

ws.onerror = function(event) {
  unableToConnectMessage()
};
