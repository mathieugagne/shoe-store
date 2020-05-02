# frozen_string_literal: true

require 'pstore'
require_relative '../../services/occurrence_calculator'

module Web
  module Controllers
    module Dashboard
      class Index
        include Web::Action
        expose :timeline, :store_occurence, :model_occurence

        def call(_params)
          @timeline = PStore.new('data/critical_stock.pstore')
          @store_occurence = OccurrenceCalculator.call(
            data: select('store', 'critical_stock')
          )
          @model_occurence = OccurrenceCalculator.call(
            data: select('model', 'data')
          )
        end

        private

        def select(key, filename)
          store = PStore.new("data/#{filename}.pstore")
          data = store.transaction(true) { store[filename.to_sym] }
          data.map do |a|
            a.slice(key).values
          end.flatten
        end
      end
    end
  end
end
