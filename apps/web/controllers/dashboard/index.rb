# frozen_string_literal: true

require 'pstore'

module Web
  module Controllers
    module Dashboard
      class Index
        include Web::Action
        expose :store
        def call(_params)
          @store = PStore.new('data/critical_stock.pstore')
        end
      end
    end
  end
end
