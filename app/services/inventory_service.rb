class InventoryService
  def self.update_inventory_from_json(inventory_json)
    store = Store.find_or_create_by(name: inventory_json['store'])
    sku = Sku.find_or_create_by(name: inventory_json['model'])
    new_quantity = inventory_json['inventory']&.to_i

    return unless store.persisted? && sku.persisted? && new_quantity.present? # could also log, notify using ActiveSupport::Notifications, etc...

    inventory = store.inventories.find_or_create_by(sku: sku)

    ActiveSupport::Notifications.instrument('quantity_update', sku: sku.id, store: store.id, old_quantity: inventory.quantity, new_quantity: new_quantity) do
      inventory.update_attributes(quantity: new_quantity)
    end
  rescue StandardError => e # Would NOT usually do this, would rather write a rescue for each specific case we find carefully
    Rails.logger.error "Error updating inventory: #{e}"
  end
end
