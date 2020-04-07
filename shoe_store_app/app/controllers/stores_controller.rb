class StoresController < ApplicationController   
	def index 
		@stores = Store.includes(:shoes).all
	end

	def suggest_transfer
		shoe = Shoe.find(params[:id])

		high_inventory_stores = Store.joins(:shoes).where(['shoes.model = ? AND shoes.inventory > ?', shoe.model, 90] )
		render json: high_inventory_stores
	end
end