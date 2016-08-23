Rails.application.routes.draw do
  resources :categories
  root "categories#index"
  resources :ingredients
  resources :recipes
  resources :categories do
    resources :recipes
  end
  resources :recipes do
    resources :ingredients
  end
  # resources :users
end
