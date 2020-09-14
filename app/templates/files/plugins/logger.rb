# frozen_string_literal: true

module GEM_MODULE
  # wrapper for logging using a singleton logger provided by consumer application
  class Logger
    def self.log(err)
      return if GEM_MODULE.configuration.logger_class.blank?

      Object.const_get(GEM_MODULE.configuration.logger_class)
            .send(GEM_MODULE.configuration.logger_method, err)
    end
  end
end
