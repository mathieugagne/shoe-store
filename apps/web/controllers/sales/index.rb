# frozen_string_literal: true

require_relative '../../services/inventory_calculator'
require_relative '../data_filter'

module Web
  module Controllers
    module Sales
      class Index
        include Web::Action
        include DataFilter
        expose :model_inventory, :store_inventory, :number_of_sales_by_store,
               :number_of_sales_by_model

        def call(_params)
          @model_inventory = InventoryCalculator.call(type: 'model')
          @store_inventory = InventoryCalculator.call(type: 'store')
          @number_of_sales_by_store = OccurrenceCalculator.call(
            data: select('store', 'data')
          )
          @number_of_sales_by_model = OccurrenceCalculator.call(
            data: select('model', 'data')
          )
        end
      end
    end
  end
end
