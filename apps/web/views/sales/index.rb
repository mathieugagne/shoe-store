# frozen_string_literal: true

module Web
  module Views
    module Sales
      class Index
        include Web::View

        def worst_sales(data)
          data.sort_by { |_key, value| value }.last(5).reverse
        end

        def best_sales(data)
          data.sort_by { |_key, value| value }.first(5)
        end
      end
    end
  end
end
