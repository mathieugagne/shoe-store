require 'test_helper'

class InventoryServiceTest < ActiveSupport::TestCase
  let(:sku) { Sku.find_or_create_by(name: 'Model T') }
  let(:store) { Store.find_or_create_by(name: "Test Store").tap { |s| s.inventories.find_or_create_by(sku: sku, quantity: 10) } }

  describe '#update_inventory_from_json' do
    before do
      sku && store # touch to initialize, we could use seeds, fixtures, etc. but I like to initialize everything a test
                   # needs in the test as much as possible, without massively complexifying things. There's a balance!
    end

    describe "when the store does not exist" do
      describe "when the sku does not exist" do
        it 'creates the sku, the store, and initializes the inventory to the appropriate quantity' do
          InventoryService.update_inventory_from_json('store' => 'New Store', 'model' => 'New Model', 'inventory' => '42')
          new_store = Store.find_by(name: 'New Store')
          new_sku = Sku.find_by(name: 'New Model')
          refute_equal store.id, new_store.id
          refute_equal sku.id, new_sku.id
          assert_equal 42, Inventory.find_by(store: new_store, sku: new_sku).quantity
        end
      end

      describe 'when the sku exists' do
        it 'finds the appropriate sku, creates the store, and initializes the inventory to the appropriate quantity' do
          InventoryService.update_inventory_from_json('store' => 'New Store', 'model' => sku.name, 'inventory' => '42')
          new_store = Store.find_by(name: 'New Store')
          refute_equal store.id, new_store.id
          assert_equal 42, Inventory.find_by(store: new_store, sku: sku).quantity
        end
      end
    end

    describe 'when the store exists' do
      describe 'when the inventory record does not exist' do
        describe 'when the sku does not exist' do
          it 'creates the sku, finds the store, and initializes the inventory to the appropriate quantity' do
            InventoryService.update_inventory_from_json('store' => store.name, 'model' => 'New Model', 'inventory' => '42')
            new_sku = Sku.find_by(name: 'New Model')
            refute_equal sku.id, new_sku.id
            assert_equal 42, Inventory.find_by(store: store, sku: new_sku).quantity
          end
        end

        describe 'when the sku does exist' do
          it 'finds the sku, finds the store, and initializes the inventory to the appropriate quantity' do
            store.inventories.destroy_all

            InventoryService.update_inventory_from_json('store' => store.name, 'model' => sku.name, 'inventory' => '42')
            assert_equal 42, Inventory.find_by(store: store, sku: sku).quantity
          end
        end
      end

      describe 'when the inventory record exists' do
        it 'updates the existing inventory record to the appropriate quantity' do
          # validate that the old value is present, not necessary but a safety check to make sure our db cleaner is
          # actually behaving.

          assert_equal 10, Inventory.find_by(store: store, sku: sku).quantity
          InventoryService.update_inventory_from_json('store' => store.name, 'model' => sku.name, 'inventory' => '42')
          assert_equal 42, Inventory.find_by(store: store, sku: sku).quantity
        end
      end
    end
  end
end
