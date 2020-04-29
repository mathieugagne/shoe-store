# frozen_string_literal: true

require 'hanami/logger'

class ShoeLine
  attr_reader :filename, :data

  def initialize(args)
    @filename = args[:filename]
    @data = args[:data]

    add_to_db(filename, data)
  end

  private

  def add_to_db(filename, data)
    store = PStore.new("data/#{filename}.pstore")

    store.transaction do
      data_w_time = data.merge({ created_at: Time.now })
      store[filename.to_sym] ||= []
      store[filename.to_sym].push(data_w_time)
    end
    low_stock_logs if low_stock?
  end

  def low_stock_logs
    Hanami::Logger.new.warn(low_stock_warn(data))
  end

  def low_stock_warn(data)
    "#{data['store']}: #{data['inventory']} #{data['model']} left"
  end

  def low_stock?
    filename == 'critical_stock'
  end
end
