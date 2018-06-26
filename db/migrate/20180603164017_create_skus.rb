class CreateSkus < ActiveRecord::Migration[5.1]
  def change
    create_table :skus do |t|
      t.string :name

      t.timestamps
    end
  end
end
