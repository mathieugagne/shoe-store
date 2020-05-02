# frozen_string_literal: true

require 'faye/websocket'
require 'eventmachine'
require 'hanami/logger'
require_relative './apps/web/services/populate_db.rb'
require_relative './apps/web/services/rescue_team.rb'

class ClientInventory
  class << self
    def start_loop
      wsocket = create_client
      handle_connected(wsocket)
      handle_disconnect(wsocket)
      handle_message(wsocket)
      handle_error(wsocket)
    end

    private

    def handle_message(wsocket)
      wsocket.on :message do |event|
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
        retry_connection
      end
    end

    def handle_error(wsocket)
      # start rabbit mq to enqueue error message
      wsocket.on :error do |error|
        RescueTeam.call(url: error.current_target.url,
                        message: error.message,
                        created_at: DateTime.now)
      end
    end

    def retry_connection
      Hanami::Logger.new.info('disconnect, reconnecting in 2 seconds')
      EventMachine::Timer.new(2) do
        start_loop
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
