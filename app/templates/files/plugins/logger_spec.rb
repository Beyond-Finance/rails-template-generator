# frozen_string_literal: true

require 'spec_helper'
require 'GEM_NAME/logger'

class MockLogger
  def self.mock_log(err)
    err
  end
end

RSpec.describe GEM_MODULE::Logger do
  describe '.log' do
    let(:message) { Faker::Lorem.sentence }
    subject { described_class.log message }

    context 'when no logger configured' do
      before { GEM_MODULE.configure { |c| c.logger_class = nil } }

      it { is_expected.to be nil }
    end

    context 'when logger configured' do
      before do
        GEM_MODULE.configure do |c|
          c.logger_class = 'MockLogger'
          c.logger_method = :mock_log
        end
        allow(MockLogger).to receive(:mock_log).and_call_original
      end

      it do
        is_expected.to eq message
        expect(MockLogger).to have_received(:mock_log).with message
      end
    end
  end
end
