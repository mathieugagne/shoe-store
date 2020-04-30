require 'pstore'

module Web
  module Controllers
    module Settings
      class Create
        include Web::Action

        def call(params)
          store = PStore.new('config/settings.pstore')
          populate_settings(store)
          redirect_to '/'
        end

        private

        def populate_settings(store)
          store.transaction do
            store['limit'] ||= []
            store['limit'].push(params[:settings][:critical_limit])
          end
        end
      end
    end
  end
end
