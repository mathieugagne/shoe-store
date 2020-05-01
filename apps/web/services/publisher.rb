# frozen_string_literal: true

require 'bunny'

class Publisher
  class << self
    def call(exchange, message = {})
      x = channel.fanout(exchange)
      x.publish(message.to_json)
    end

    def channel
      @channel ||= connection.create_channel
    end

    def connection
      @connection ||= Bunny.new.tap(&:start)
    end
  end
end
