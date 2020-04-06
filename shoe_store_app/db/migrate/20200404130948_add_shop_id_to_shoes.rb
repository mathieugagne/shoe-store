class AddShopIdToShoes < ActiveRecord::Migration[6.0]
  def change
    add_column :shoes, :store_id, :integer
    add_index  :shoes, :store_id
  end
end
