# frozen_string_literal: true

module Web
  module Views
    module Sales
      class Index
        include Web::View

        SALES_TITLE = ['Best sales', 'Biggest seller'].freeze

        def highest_first(data)
          data.sort_by { |_key, value| value }.last(5).reverse
        end

        def lowest_first(data)
          data.sort_by { |_key, value| value }.first(5)
        end

        def column_name(title)
          SALES_TITLE.include?(title) ? 'Number of sales' : 'Stock remaining'
        end
      end
    end
  end
end
