Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :reports, only: [:index, :create]
      resources :contacts, only: [:index, :create]
    end
  end

  get '/homeee/:123', to: 'home#show'

  get '*unmatched_route', to: 'home#index'
end
