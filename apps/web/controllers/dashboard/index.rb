# frozen_string_literal: true

require 'pstore'

module Web
  module Controllers
    module Dashboard
      class Index
        include Web::Action
        expose :store, :settings

        def call(_params)
          @store = PStore.new('data/critical_stock.pstore')
          @settings = PStore.new('config/settings.pstore')
        end
      end
    end
  end
end
