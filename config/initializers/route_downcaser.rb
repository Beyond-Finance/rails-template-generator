# frozen_string_literal: true

RouteDowncaser.configuration do |config|
  config.redirect = true

  config.exclude_patterns = [
    %r{assets/}i,
    %r{fonts/}i,
    %r{templates/}i
  ]
end
