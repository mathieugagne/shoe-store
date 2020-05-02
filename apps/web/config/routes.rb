# frozen_string_literal: true

# Configure your routes here
# See: https://guides.hanamirb.org/routing/overview
#
# Example:
# get '/hello', to: ->(env) { [200, {}, ['Hello from Hanami!']] }
get '/', to: 'timeline#index'
get '/alerts', to: 'dashboard#index'
get '/sales', to: 'sales#index'
resources :settings, only: %i[create]
