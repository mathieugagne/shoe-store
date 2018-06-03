class AddIndexToInventories < ActiveRecord::Migration[5.1]
  def change
    add_index :inventories, [:store_id, :sku_id], unique: true
  end
end
