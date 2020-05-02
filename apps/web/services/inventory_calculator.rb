# frozen_string_literal: true

class InventoryCalculator
  class << self
    def call(type:, filename: 'data/data.pstore')
      targeted_data = select_couple_inventory(type, filename)
      compute_inventory(targeted_data)
    end

    private

    # select the couple of data we want (eg: inventory and model)
    def select_couple_inventory(type, filename)
      store = PStore.new(filename)
      store.transaction do
        store[:data].map do |a|
          [a.slice(type).values[0], a.slice('inventory').values[0]]
        end
      end
    end

    def compute_inventory(data)
      data.each_with_object(Hash.new(0)) do |stock, memo|
        memo[stock[0]] = if memo.key?(stock[0])
                           stock[1].to_i + memo[stock[0]].to_i
                         else
                           stock[1]
                         end
      end
    end
  end
end
