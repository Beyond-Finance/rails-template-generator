# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationHelper, type: :helper do
  let(:raw_string) do
    <<~RAW
      key1: "value1"
      key2: "value2"
    RAW
  end
  let(:rendered_string) { '"key1: \"value1\"\nkey2: \"value2\"\n"' }

  describe '#file_as_quoted_string' do
    let(:file_name) { Faker::File.file_name }
    before do
      allow(File)
        .to receive(:read).with(Rails.root.join("app/views/templates/files/#{file_name}"))
                          .and_return raw_string
    end
    subject { helper.file_as_quoted_string(file_name) }

    it { is_expected.to eq rendered_string }
  end

  describe '#quoted_string' do
    subject { helper.quoted_string(raw_string) }

    it { is_expected.to eq rendered_string }
  end

  describe '#title' do
    let(:title) { Faker::Lorem.sentence }
    subject { helper.title(title) }

    it { is_expected.to eq title }
  end
end
