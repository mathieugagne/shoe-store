# frozen_string_literal: true

require 'json'
require 'pstore'
require_relative './publisher'

class RescueTeam
  class << self
    def call(args)
      Publisher.call('incident.inventory', args)
    end
  end
end
