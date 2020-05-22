# Shoe Store

## Inventory monitoring (Clément)

My goal with this minimalist monitoring tool was to help the inventory team and in the same time build a lightweight application. How did I do this ?

### For the inventory team

I've built a straightforward tool to help the inventory team to have an overview of the sales. I've put the focus on the main critical points and only that.
In this way the inventory team can:

- Check the inventory in realtime via a livestream.
- They can adjust the critical limit (low stock level) and also the comfort zone (high stock level) based on the activity.
- Using the alert they can identify the stores that have issues in managing their stock and the product that are often under the critical limit.
- Monitore the timeline
- Have the sales overview with 3 subcategories
  * Number of sales, per store and per model
  * Stock remaining per store
  * Stock remaining per model

### For the technical team

If their is an issue with the client => serveur connection  a notification will be sent to the dev team via an AMQP (RabbitMQ). Of course we need to connect our `consumer` to go further.

### Technical choices

I have tried a lot of new things, it was a good opportunity to walk away from my day to day Rails/PG. As mentionned above, I wanted a lightweight application. That is why I've decided to use the Hanami/PStore couple. To be honest I felt a bit limited with these tools. It's a good reminder that Rails is an awesome and well documented framework.

Main tools:
* Hanami
* PStore
* JQuery
* Faye
* Rspec

### Run the project

1. `bundle exec hanami server`
2. `websocketd --port=8080 ruby inventory.rb`
    *This command allows you to see change in realtime but without persistence*
3. `ruby client_inventory.rb`
    *This add the persistence*
4. for the fun we can run `/usr/local/opt/rabbitmq/sbin/rabbitmq-server`
to start a Rabbit and simulate an error.
5. you can run the test suite with `bundle exec rspec`.


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
