module Web
  module Controllers
    module Settings
      class New
        include Web::Action

        def call(params)
          @settings = PStore.new('data/settings.pstore')
        end
      end
    end
  end
end
