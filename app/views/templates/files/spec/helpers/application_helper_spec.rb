# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationHelper, type: :helper do
  describe '#title' do
    let(:title) { Faker::Lorem.sentence }
    subject { helper.title(title) }

    it { is_expected.to eq title }
  end
end
