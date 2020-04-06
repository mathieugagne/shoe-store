Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :stores, only: [:index] do
    resources :shoes, only: [:index]
  end
end
