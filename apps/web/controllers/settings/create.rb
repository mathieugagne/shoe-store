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
            params[:settings].each do |a|
              next if a[1] == ''

              store[a[0].to_s] ||= []
              store[a[0].to_s].push(a[1])
            end
          end
        end
      end
    end
  end
end
