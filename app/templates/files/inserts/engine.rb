
    config.generators do |g|
      g.factory_bot dir: 'spec/factories'
      g.fixture_replacement :factory_bot
      g.test_framework :rspec
    end
