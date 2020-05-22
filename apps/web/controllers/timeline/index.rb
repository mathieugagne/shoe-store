# frozen_string_literal: true

module Web
  module Controllers
    module Timeline
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
