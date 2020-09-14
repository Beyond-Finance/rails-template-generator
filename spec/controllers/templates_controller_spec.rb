# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TemplatesController, type: :controller do
  describe 'GET #index' do
    before { get :index }

    it { expect(response).to have_http_status :success }
    it { expect(response).to render_template :index }
  end

  describe 'GET #show' do
    let(:attrs) { { 'display_name' => display_name, 'ui' => true } }
    let(:base64_attrs) { Base64.encode64(attrs.to_json) }
    let(:display_name) { Faker::Lorem.sentence }
    before { get :show, params: { attrs: base64_attrs } }

    it { expect(response).to have_http_status :success }
    it { expect(response).to render_template 'scripts/application' }
    it { expect(assigns(:template).ui?).to be true }
    it { expect(assigns(:template).display_name).to eq display_name }

    context 'when bad attribute encoding' do
      let(:base64_attrs) { 'not_decodable' }

      it { expect(response).to have_http_status :unprocessable_entity }
    end
  end
end
