# Shoe Store

## My work

#### Installation

```js
$ npm install

//web socket need to be started first
$ websocketd --port=8080 ruby inventory.rb

$npm start
```

This application is made with 
- React and Redux.
- A simple use of React-router
- Styled-components library for the styling.

The application template was created with *create-react-app* and is not ejected.

### What the app do

First you have the "dashboard" view, which is not very stylish and don't look like a real dashboard, but is functionnal and meet the acceptance criteria. This will be refresh on each update. 

All the app is based on three general state. 
- In stock (> 10) (blue)
- Low On Stock (<=10) (yellow)
- No stock (=0) (red)
I also used a color to indentify the category. This is useful to see faster the current level of the product inventory.

There is three block on top of the dashboard that are used to show that basic indication about the inventory. 
- The first one indicates the number of product with more than 10 pieces in the inventory.
- The second one indicates the number of product with less or equal to 10 pieces in the inventory.
- The third one indicates the number of product that don't have any pieces in the inventory (=0).

Those three tiles can be clicked, and will filtered both table below.

- The first table lists all the store with a resume of the products inventory following the general state I mention earlier.
- The second table lists all the products with the quantity left. 

Those table can be filtered by the store name or by the general state.

The second view is called "transfer", because this view is used to transfer product between store.
Currently, there is no server listening to receive a request, so everything is happening on the client side.
This view will allow you to : 
- Select a store from where you move a product.
- Select a store where the product will be moved.
- Choose the product
- Enter the required quantity
- Apply the transfer

This functionnality is created in the optic to equalize the product quantity between all the stores.
So you will only have the product with a low inventory listed under the destination, and you will have the matching product on the other side if the inventory is enough.


------------------------
------------------------
------------------------



## Synopsis

Aldo Shoes is having a huge flash sale online. You provide support to the inventory department. They want to react real-time to various inventory problems as they arise.

You adjust the inventory whenever a new sale is completed. The return value includes the store, the shoe model and the inventory left for that shoe model in the store.

```
{
  'store' => 'ALDO Ste-Catherine',
  'model' => 'ADERI',
  'inventory' => 10,
}
```

`ALDO Ste-Catherine` store sold a pair of `ADERI` shoes. `ALDO Ste-Catherine` now has 10 pairs of `ADERI` left.

## Goal

**Design an interface that would allow the inventory department to monitor Aldo's stores and shoes inventory.**

Hope you’ll have fun with this little test. I know I had designing it.
Go wild. It can be anything you want. I’ve seen results printed to console, displayed on a webpage, and even someone who did periodical database dumps.

Here are a few ideas if you need an extra challenge:

- Add some sort of alerting system, e.g. When a shoe model at a store goes too low, or too high.
- Add a REST JSON API, or GraphQL
- Suggest shoe transfers from one store to another according to inventory
- Your own crazy idea!

Share your repository with us when you’re done.

Happy Hacking :)

## Installation

This projects uses the popular library `websocketd` to send messages.

If you're on a Mac, you can install `websocketd` using [Homebrew](http://brew.sh/). Just run `brew install websocketd`. For other operating systems, or if you don't want to use Homebrew, check out the link below.

**[Download for Linux, OS X and Windows](https://github.com/joewalnes/websocketd/wiki/Download-and-install)**

Note that a Ubuntu 64-bit version is already bundled here `bin/websocketd` for convenience.

## Getting Started

### Inventory Server

Your WebSocket Server is the tap that aggregates inventories from all stores.

You can run it directly from your own machine.

Run the following to start tapping into the inventory events.

```
(bin/)websocketd --port=8080 ruby inventory.rb
```

You now have an active connection to their stores opened on port 8080.

### Start listening on each event

Listen and react on each event using a WebSocket client.

Various implementations are at your disposal. Whatever floats your boat.

They all work the same way. Provide a method or a block to be executed whenever a new event occurs.

Here are two examples for our favorite languages:

#### Javascript

Open a console on a non-secured page:

```
var ws = new WebSocket('ws://localhost:8080/');

ws.onmessage = function(event) {
  console.log(event.data);
};
```

#### Ruby

##### Installation

```
gem install faye-websocket
gem install eventmachine
```

##### Example

```
require 'faye/websocket'
require 'eventmachine'
require 'json'

EM.run {
  ws = Faye::WebSocket::Client.new('ws://localhost:8080/')

  ws.on :message do |event|
    p JSON.parse(event.data)
  end
}
```
