# frozen_string_literal: true

require_relative './publisher'

class RescueTeam
  class << self
    def call(args)
      Publisher.call('incident.inventory', args)
    rescue StandardError => e
      Hanami::Logger.new.error("Error: #{e.message}, please start websocket and/or RabbitMq")
    end
  end
end
