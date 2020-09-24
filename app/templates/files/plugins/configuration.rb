# frozen_string_literal: true

module GEM_MODULE
  # configuration for client gem setting up credentials, defaults, and logging
  class Configuration
    attr_accessor :env, :logger_class, :logger_method

    def initialize
      @env = nil
      @logger_class = 'ExceptionLogger'
      @logger_method = :error
    end
  end
end
