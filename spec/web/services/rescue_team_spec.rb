# frozen_string_literal: true

require_relative '../../../apps/web/services/rescue_team'

describe RescueTeam do
  let(:message) {{ url: "ws://localhost:808/inventory", message: "Errno::ECONNREFUSED" }}

  it 'call the Publisher with the correct argument' do
    expect(Publisher).to receive(:call)
      .with('incident.inventory', message)

    described_class.call(message)
  end
end
