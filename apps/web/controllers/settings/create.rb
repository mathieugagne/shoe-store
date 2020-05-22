# frozen_string_literal: true

require 'pstore'

module Web
  module Controllers
    module Settings
      class Create
        include Web::Action

        def call(_params)
          store = PStore.new('config/settings.pstore')
          populate_settings(store)
        end

        private

        def populate_settings(store)
          store.transaction do
            params[:settings].each do |setting|
              next if setting[1] == ''

              store[setting[0].to_s] ||= []
              store[setting[0].to_s].push(setting[1])
            end
          end
        end
      end
    end
  end
end
