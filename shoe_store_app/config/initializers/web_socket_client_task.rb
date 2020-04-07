module ClientValues
	STORE = 'store'
	MODEL = 'model'
	INVENTORY = 'inventory'
end

Thread.new do
	Rails.application.executor.wrap do
		EM.run {
			ws = Faye::WebSocket::Client.new('ws://localhost:8080/')
	
			ws.on :message do |event|
				parsed_data = JSON.parse(event.data)

				# Preventing sql injection
				shoe = Shoe.joins(:store).where(['stores.name =? AND shoes.model = ?', parsed_data[ClientValues::STORE], parsed_data[ClientValues::MODEL]]).first
				if shoe.present?
					shoe.inventory = parsed_data[ClientValues::INVENTORY]
					shoe.save
				end
			end
		}
	end
end