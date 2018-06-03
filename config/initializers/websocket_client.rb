return if Rails.env.test?

@websocket_client = Thread.new {
  EM.run {
    ws = Faye::WebSocket::Client.new('ws://localhost:8080/')

    ws.on :message do |event|
      # Put additional error handling here in case event is not the right type, has bad data, etc...

      # Ultimately route to the handler
      InventoryService.update_inventory_from_json(JSON.parse(event.data))
    end
  }
}

# I like the finalizer pattern better than this, but just to be straightforward it's necessary to kill this Thread on
# server shutdown.
at_exit do
  @websocket_client.kill
end
