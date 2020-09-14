# frozen_string_literal: true

GEM_MODULE.configure do |config|
  config.env = Rails.env
  # TODO: define for a logger singleton for logging exceptions from the client
  # config.logger_class = 'ExceptionLogger'
  # config.logger_method = :error
end
