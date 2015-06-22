## Shoe Store Websocket


### To start your shoe store websocket

```
bin/websocketd --port=8080 ruby shoe_store.rb
```

### Now connect to your program from JavaScript in a web-page using a WebSocket:

```
var ws = new WebSocket('ws://localhost:8080/');

ws.onmessage = function(event) {
  console.log(event.data);
};
```