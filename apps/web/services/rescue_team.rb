# frozen_string_literal: true

require_relative './publisher'

class RescueTeam
  class << self
    def call(args)
      Publisher.call('incident.inventory', args)
    rescue StandardError => e
      Hanami::Logger.new.error(error_message(e))
    end

    private

    def error_message(error)
      "Error: #{error.message}, please start websocket and/or RabbitMq"
    end
  end
end
