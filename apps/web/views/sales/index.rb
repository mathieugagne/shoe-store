# frozen_string_literal: true

module Web
  module Views
    module Sales
      class Index
        include Web::View

        SALES_TITLE = ['Sales per model', 'Sales per store'].freeze

        def highest_first(data)
          data.sort_by { |_key, value| value }.reverse
        end

        def column_name(title)
          SALES_TITLE.include?(title) ? 'Number of sales' : 'Stock remaining'
        end

        def dasherize(key)
          key.gsub(' ', '_').downcase
        end
      end
    end
  end
end
