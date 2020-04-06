class AddIndexToStore < ActiveRecord::Migration[6.0]
  def change
    add_index :stores, :name
  end
end
