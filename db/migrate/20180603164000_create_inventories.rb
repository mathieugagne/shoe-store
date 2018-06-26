class CreateInventories < ActiveRecord::Migration[5.1]
  def change
    create_table :inventories do |t|
      t.integer :store_id
      t.integer :sku_id
      t.integer :quantity, default: 0, null: false

      t.timestamps
    end
  end
end
