jQuery(document).on 'turbolinks:load', ->
  update_window = $('#update-window')

  App.inventory_stream = App.cable.subscriptions.create {
    channel: "InventoryUpdatesChannel"
  },
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    if data['new_quantity'] > data['old_quantity']
      data['severity'] = 'restored'
      data['message'] = 'Quantity Replenished:'
    if data['severity'] == 'error' || data['severity'] == 'warn' || data['severity'] == 'restored'
      update_window.append "<div class=#{data['severity']}>#{data['message']}: <ul><li>Store: #{data['store']}</li><li>Model: #{data['sku']}</li><li>Current Inventory: #{data['new_quantity']}</li></ul></div>"
      update_window.scrollTop(update_window.prop("scrollHeight"))
