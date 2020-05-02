# frozen_string_literal: true

require_relative '../../services/sales_calculator'

module Web
  module Controllers
    module Sales
      class Index
        include Web::Action
        expose :model_sales, :store_sales

        def call(_params)
          @model_sales = SalesCalculator.call(type: 'model')
          @store_sales = SalesCalculator.call(type: 'store')
        end
      end
    end
  end
end
