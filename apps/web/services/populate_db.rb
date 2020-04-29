# frozen_string_literal: true

require 'json'
require 'pstore'
require_relative '../../../lib/shoe_store/entities/shoe_line'

class PopulateDb
  class << self
    def call(data: args)
      persist_stock(data)
    end

    private

    def persist_stock(data)
      ShoeLine.new(filename: key_store(data),
                   data: data,
                   low_stock: low_stock(data))
    end

    def low_stock(data)
      data['inventory'].to_i <= 10
    end

    def key_store(data)
      return 'critical_stock' if low_stock(data)

      data['store'].gsub(' ', '_')
                   .downcase
    end

  end
end
