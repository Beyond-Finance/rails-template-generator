# frozen_string_literal: true

class PingController < ActionController::Base
  def index
    render inline: 'ok'
  end
end
