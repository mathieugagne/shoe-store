# frozen_string_literal: true

module Web
  module Controllers
    module Stores
      class Index
        include Web::Action
        expose :stores
        def call(_params)
          data_stores = PStore.new('data/data.pstore')
          @stores = populate_store(data_stores)
        end

        private

        def populate_store(store)
          store.transaction do
            return [] if store[:data].nil?

            store[:data].each_with_object({}) do |d, memo|
              create_or_increment(d, memo)
            end
          end
        end

        def create_or_increment(data, memo)
          if memo[data['store']].nil?
            create_store(data, memo)
          elsif model_exist?(data, memo)
            increment_inventory(data, memo)
          else
            create_model(data, memo)
          end
        end

        def model_exist?(data, memo)
          memo[data['store']].select { |a| a.key?(data['model']) }.any?
        end

        def create_store(data, memo)
          memo[data['store']] = [{ data['model'] => data['inventory'] }]
        end

        def increment_inventory(data, memo)
          memo[data['store']].select do |a|
            if a.key?(data['model'])
              a.values[0] += data['inventory']
              break
            end
          end
        end

        def create_model(data, memo)
          memo[data['store']].push({ data['model'] => data['inventory'] })
        end
      end
    end
  end
end
