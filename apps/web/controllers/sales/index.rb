# frozen_string_literal: true

require_relative '../../services/inventory_calculator'

module Web
  module Controllers
    module Sales
      class Index
        include Web::Action
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
