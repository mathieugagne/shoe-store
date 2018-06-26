class InventoryUpdatesChannel < ApplicationCable::Channel
  def subscribed
    stream_from("inventory_updates_channel")
  end

  def unsubscribed
  end
end
