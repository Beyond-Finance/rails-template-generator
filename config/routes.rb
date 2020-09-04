# frozen_string_literal: true

Rails.application.routes.draw do
  root 'templates#index'

  resources :templates, only: %i[index show], param: :attrs

  resources :ping, only: %(index)
end
