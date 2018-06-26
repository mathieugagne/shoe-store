class Store < ApplicationRecord
  has_many :inventories, dependent: :destroy
  has_many :skus, through: :inventories

  def quantity(sku)
    inventories.find_by(sku: sku)&.quantity
  end
end
