class StoresController < ApplicationController   
	def index
		@stores = Store.includes(:shoes).all
	end
end