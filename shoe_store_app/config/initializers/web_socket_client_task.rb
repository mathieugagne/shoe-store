Thread.new do
	Rails.application.executor.wrap do
		EM.run {
			ws = Faye::WebSocket::Client.new('ws://localhost:8080/')
	
			ws.on :message do |event|
				parsed_data = JSON.parse(event.data)

				# To handle sql injection I would check the parsed_data for values agains the shop or shoes
				# Since it was not mention I will move on
				shoe = Shoe.joins(:store).where('stores.name' => parsed_data['store'], 'shoes.model' => parsed_data['model']).first
				if shoe.present?
					shoe.inventory = parsed_data['inventory']
					shoe.save
				end
			end
		}
	end
end