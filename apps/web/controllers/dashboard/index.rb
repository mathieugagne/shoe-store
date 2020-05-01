# frozen_string_literal: true

require 'pstore'
require_relative '../../services/occurrence_calculator'

module Web
  module Controllers
    module Dashboard
      class Index
        include Web::Action
        expose :store, :store_occurence, :model_occurence

        def call(_params)
          @store = PStore.new('data/critical_stock.pstore')
          @store_occurence = OccurrenceCalculator.call(data: select('store'))
          @model_occurence = OccurrenceCalculator.call(data: select('model'))
        end

        private

        def select(key)
          data = store.transaction(true) { store[:critical_stock] }
          data.map do |a|
            a.slice(key).values
          end.flatten
        end
      end
    end
  end
end
