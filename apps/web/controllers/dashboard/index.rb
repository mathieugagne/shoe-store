# frozen_string_literal: true

require 'pstore'
require_relative '../../services/occurrence_calculator'
require_relative '../data_filter'

module Web
  module Controllers
    module Dashboard
      class Index
        include Web::Action
        include DataFilter
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
      end
    end
  end
end
