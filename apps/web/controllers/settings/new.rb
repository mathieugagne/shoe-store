# frozen_string_literal: true

module Web
  module Controllers
    module Settings
      class New
        include Web::Action

        def call(_params)
          @settings = PStore.new('data/settings.pstore')
        end
      end
    end
  end
end
