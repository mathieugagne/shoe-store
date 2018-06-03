ActiveSupport::Notifications.subscribe('quantity_update') do |_name, _start, _finish, _id, payload|
  # Could do any variety of update here based on this notification, such as sending another alert out a websocket client,
  #  calling another service to implement pluggable actions based on parameters (e.g. if the quantity drops too fast),
  #  or even calling another API, e.g. to place a transfer request from the warehouse or mark the item as no longer
  #  available on the website.
  #
  # For now I'm just logging the details if the quantity is sane and logging an error if the quantity has dropped by
  #  more than 10 or is lower than 5.
  # I've deliberately passed the ID of the store and sku, not the object itself. This is more portable across implementations,
  #   and allows the use of queuing systems to directly use the data from the notification. Queues that are passed the
  #   ruby objects rather than their IDs can suffer data corruption, object instantiation issues, sync problems, and
  #   other difficult-to-track-down bugs which are easily prevented by passing only IDs where the possibility of
  #   queuing the raw data could occur. As a result, I consider it a best practice in notifications as well.

  store = Store.find_by(id: payload[:store])
  sku = Sku.find_by(id: payload[:sku])
  detail_string = "#{store.name} | #{sku.name} | #{payload[:old_quantity]} => #{payload[:new_quantity]}"

  if payload[:new_quantity] < 5
    message = "Quantity LOW!!"
    severity = :error
  elsif payload[:old_quantity] - payload[:new_quantity] > 10
    message = "Quantity Dropping Quickly!"
    severity = :warn
  else
    message = "Quantity Update"
    severity = :info
  end

  Rails.logger.send severity, "#{message} :: #{detail_string}"

  # And just for giggles, let's broadcast this to the website using our own ActionCable websocket.
  #  Of course, normally you'd use a view or serializer here to render this as JSON or something nice,
  #  but I'm being quick about it and to be clear what's really happening without the abstractions:
  inventory = store.inventories.includes(:sku).order('skus.name asc')
  ActionCable.server.broadcast("inventory_updates_channel",
                                message: message,
                                store: store.name,
                                sku: sku.name,
                                old_quantity: payload[:old_quantity],
                                new_quantity: payload[:new_quantity],
                                severity: severity,
                                chart_data: {
                                  store_id: store.id,
                                  labels: inventory.map { |i| i.sku.name },
                                  data: inventory.map(&:quantity)
                                  })
end
