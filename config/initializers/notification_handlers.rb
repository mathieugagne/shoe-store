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
  if payload[:new_quantity] < 5
    Rails.logger.error "Quantity LOW!! :: #{Store.find_by(id: payload[:store]).name} | #{Sku.find_by(id: payload[:sku]).name} | #{payload[:old_quantity]} => #{payload[:new_quantity]}"
  elsif payload[:old_quantity] - payload[:new_quantity] > 10
    Rails.logger.warn "Quantity Dropping Quickly! :: #{Store.find_by(id: payload[:store]).name} | #{Sku.find_by(id: payload[:sku]).name} | #{payload[:old_quantity]} => #{payload[:new_quantity]}"
  else
    Rails.logger.info "Quantity Update :: #{Store.find_by(id: payload[:store]).name} | #{Sku.find_by(id: payload[:sku]).name} | #{payload[:old_quantity]} => #{payload[:new_quantity]}"
  end
end
