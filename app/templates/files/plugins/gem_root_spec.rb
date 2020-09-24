# frozen_string_literal: true

require 'spec_helper'

RSpec.describe GEM_MODULE do
  describe '.configure' do
    let(:env) { Faker::Internet.slug }
    let(:logger_class) { Faker::Lorem.word }
    let(:logger_method) { ":#{Faker::Lorem.word}" }
    before do
      GEM_MODULE.configure do |c|
        c.env = env
        c.logger_class = logger_class
        c.logger_method = logger_method
      end
    end
    subject { GEM_MODULE.configuration }

    it do
      expect(subject.env).to eq env
      expect(subject.logger_class).to eq logger_class
      expect(subject.logger_method).to eq logger_method
    end
  end
end
