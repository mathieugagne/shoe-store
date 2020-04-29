# frozen_string_literal: true

require 'json'
require 'pstore'
require 'hanami/logger'

class PopulateDb
  class << self
    def call(data: args)
      persist_stock(data)
    end

    private

    def persist_stock(data)
      store = PStore.new("data/#{key_store(data)}.pstore")
      add_to_db(store, data)
      return unless data['inventory'] <= 10

      add_to_critical_stock(data)
    end

    def add_to_critical_stock(data)
      Hanami::Logger.new.warn(low_stock(data)) unless Hanami.env?(:test)
      store = PStore.new('data/critical_stock.pstore')
      add_to_db(store, data)
    end

    def add_to_db(store, data)
      store.transaction do
        data_w_time = data.merge({ created_at: Time.now })
        store[key_store(data).to_sym] ||= []
        store[key_store(data).to_sym].push(data_w_time)
      end
    end

    def key_store(data)
      # eg input ALDO Centre Eaton
      # eg output aldo_center_eaton
      data['store'].gsub(' ', '_')
                   .downcase
    end

    def low_stock(data)
      "#{data['store']}: #{data['inventory']} #{data['model']} left"
    end
  end
end
