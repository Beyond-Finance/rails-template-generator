require 'simplecov'

SimpleCov.minimum_coverage 100.0
SimpleCov.start 'rails' do
  add_filter '/spec'

  # rails-generated superclass files
  add_filter '/app/jobs/application_job.rb'
  add_filter '/app/mailers/application_mailer.rb'
  add_filter '/app/models/application_record.rb'
end

