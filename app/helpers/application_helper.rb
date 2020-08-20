# frozen_string_literal: true

module ApplicationHelper
  FILES_DIR = Rails.root.join('app/views/templates/files/')

  def file_as_quoted_string(file)
    quoted_string(File.read(FILES_DIR.join(file)))
  end

  def quoted_string(string)
    "\"#{string.gsub(/\n/, '\\n').gsub(/"/, '\\"')}\"".html_safe
  end

  def title(title)
    content_for :title, title
    title
  end
end
