# frozen_string_literal: true

RSpec.shared_examples 'web content accessibility' do |prism_page|
  scenario 'is WCAG compliant', :wcag, driver: :selenium do
    expect(prism_page).to be_accessible.according_to(:wcag2a)
  end
end
