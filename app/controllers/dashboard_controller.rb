class DashboardController < ApplicationController
  def index
    @stores = Store.all.order(name: :asc)
  end
end
