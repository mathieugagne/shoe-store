# frozen_string_literal: true

require 'faye/websocket'
require 'eventmachine'
require 'hanami/logger'
require_relative './apps/web/services/populate_db.rb'
require_relative './apps/web/services/clear_db.rb'

class ClientInventory
  class << self
    def start_loop
      wsocket = create_client
      handle_connected(wsocket)
      handle_disconnect(wsocket)
      handle_message(wsocket)
    end

    private

    def handle_message(wsocket)
      wsocket.on :message do |event|
        wsocket.send(event)
        PopulateDb.call(data: JSON.parse(event.data))
      end
    end

    def handle_connected(wsocket)
      wsocket.on :open do |_event|
        Hanami::Logger.new.info('successfully connected.')
      end
    end

    def handle_disconnect(wsocket)
      wsocket.on :close do |_event|
        Hanami::Logger.new.info('disconnect, reconnecting in 2 seconds')
        ClearDb.call
        EventMachine::Timer.new(2) do
          start_loop
        end
        wsocket = nil
      end
    end

    def create_client
      Faye::WebSocket::Client.new('ws://localhost:8080/inventory')
    end
  end
end

EventMachine.run do
  ClientInventory.start_loop
end
