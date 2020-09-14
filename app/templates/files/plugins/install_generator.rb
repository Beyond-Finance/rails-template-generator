# frozen_string_literal: true

require 'rails/generators'

module GEM_MODULE
  module Generators
    # install script for `bin/rails g GEM_NAME:install` consumer command
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path('../templates', __dir__)

      desc 'Copies GEM_MODULE initializer template to application.'
      def copy_initializer
        template 'GEM_NAME.rb', 'config/initializers/GEM_NAME.rb'
      end
    end
  end
end
