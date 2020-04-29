# frozen_string_literal: true

require 'spec_helper'

RSpec.describe Web::Views::ApplicationLayout, type: :view do
  let(:layout) do
    Web::Views::ApplicationLayout.new({ format: :html }, 'contents')
  end
  let(:rendered) { layout.render }

  it 'contains application name' do
    expect(rendered).to include('Web')
  end
end
