# frozen_string_literal: true

class TemplatesController < ApplicationController
  before_action :template, only: %i[show]
  prepend_view_path Rails.root.join('app/templates')

  def show
    render 'scripts/app', layout: false
  end

  private

  def template
    @template ||= Hashie::Mash.new(JSON.parse(Base64.decode64(params[:attrs])).deep_transform_keys(&:underscore))
  rescue JSON::ParserError
    head :unprocessable_entity
  end
end
