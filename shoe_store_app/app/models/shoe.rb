class Shoe < ApplicationRecord
  belongs_to :store

  def low_inventory
    inventory < 10
  end

  def high_inventory
    inventory > 90
  end
end
