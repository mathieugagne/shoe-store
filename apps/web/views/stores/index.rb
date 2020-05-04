# frozen_string_literal: true

module Web
  module Views
    module Stores
      class Index
        include Web::View

        def formate_class(store, model)
          store_slugged = store.downcase.gsub(' ', '_')
          "#{store_slugged}#{model.downcase}"
        end

        def low_and_high_stock_ref(store)
          store[1].minmax { |a, b| a.values <=> b.values }
        end

        def high_stock(store)
          low_and_high_stock_ref(store).last
        end

        def low_stock(store)
          low_and_high_stock_ref(store).first
        end
      end
    end
  end
end
