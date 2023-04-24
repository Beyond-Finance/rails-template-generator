# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.3'

gem 'hashie'
gem 'jbuilder'
gem 'jsbundling-rails'
gem 'pg'
gem 'puma'
gem 'rails', '~>7.0'
gem 'sass-rails'

gem 'bootsnap'

gem 'actionpack', '~>7.0'
gem 'aws-sdk'
gem 'aws-sdk-rails'
gem 'aws-sdk-secretsmanager', require: false
gem 'newrelic_rpm'
gem 'nokogiri'
gem 'rexml', '>= 3.2.5'
gem 'route_downcaser'
gem 'slim-rails'
gem 'uglifier'

group :development, :test do
  gem 'brakeman'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'pry'
  # Locked version to make sure it matches with version in codeclimate.yml. Update both when updating one.
  gem 'rubocop', '1.18.3', require: false

  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  gem 'foreman'
  gem 'pry-remote'

  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'web-console'
end

group :test do
  gem 'rails-controller-testing'
  gem 'rspec-html-matchers'
  gem 'rspec_junit_formatter'
  gem 'rspec-rails'
  gem 'simplecov', '0.17.1', require: false
end
