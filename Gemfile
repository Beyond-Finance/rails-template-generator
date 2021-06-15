# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'hashie'
gem 'jbuilder'
gem 'pg'
gem 'puma'
gem 'rails'
gem 'sass-rails'
gem 'webpacker'

gem 'bootsnap'

gem "actionpack", ">= 6.1.3.2"
gem 'aws-sdk'
gem 'aws-sdk-rails'
gem 'aws-sdk-secretsmanager', require: false
gem 'newrelic_rpm'
gem 'nokogiri', '>= 1.11.4'
gem "rexml", ">= 3.2.5"
gem 'route_downcaser'
gem 'slim-rails'
gem 'uglifier'

group :development, :test do
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'pry'
  gem 'rubocop', require: false

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
  gem 'simplecov', '< 0.18', require: false
end
