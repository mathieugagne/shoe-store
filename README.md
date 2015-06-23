# Shoe Store

## Synopsis

Aldo Shoes is having a huge flash sale online. You provide support to the inventory department. They want to react real-time to various inventory problems as they arise.

You adjust the inventory whenever a new sale is completed by pulling data from each store on the pair of shoes that just got sold.
The return value includes the store, the shoe model and the inventory left for that shoe model in the store.

    {
      'store' => 'ALDO Ste-Catherine',
      'RGNK-1456' => 10,
    }

`ALDO Ste-Catherine` store sold a pair of shoes from the model `RGNK-1456`. `ALDO Ste-Catherine` now has 10 pairs of `RGNK-1456` left.

## Goal

Design an interface that would allow the inventory department to monitor Aldo's stores and shoes inventory.

## Getting Started

### Inventory Server

Your WebSocket Server is the tap that aggregates inventories from all stores.

You can run it directly from your own machine.

Run the following to start tapping into the inventory events.

    # Ubuntu 64-bit
    bin/ubuntu/websocketd --port=8080 ruby inventory.rb

    # OS-X 64-bit
    bin/osx/websocketd --port=8080 ruby inventory.rb

You now have an active connection to their stores opened on port 8080.

### Start listening on each event

You can listen and react on each event using a WebSocket client.

Various implementations are at your disposal. Whatever floats your boat.

They all work the same way. Provide a method or a block to be executed whenever a new event occurs.

#### Javascript

Open a console on a non-secured page:

    var ws = new WebSocket('ws://localhost:8080/');

    ws.onmessage = function(event) {
      console.log(event.data);
    };

#### Ruby

    require 'faye/websocket'
    require 'eventmachine'
    require 'json'

    EM.run {
      ws = Faye::WebSocket::Client.new('ws://localhost:8080/')

      ws.on :message do |event|
        p JSON.parse(event.data)
      end
    }
