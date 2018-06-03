require 'test_helper'

class StoreTest < ActiveSupport::TestCase
  let(:sku) { Sku.find_or_create_by(name: 'Model T') }
  let(:uninventoried_sku) { Sku.find_or_create_by(name: 'Air Force One') }
  let(:store) { Store.find_or_create_by(name: "Test Store").tap { |s| s.inventories.find_or_create_by(sku: sku, quantity: 10) } }

  describe "#quantity" do
    it "returns nil if there is no inventory record for the given sku" do
      assert_nil store.quantity(nil)
      assert_nil store.quantity(uninventoried_sku)
    end

    it "returns the quantity of the sku for the present store" do
      assert_equal 10, store.quantity(sku)
    end
  end
end
