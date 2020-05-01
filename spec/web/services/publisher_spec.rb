# frozen_string_literal: true

require_relative '../../../apps/web/services/publisher'

describe Publisher do
  let(:message) {{ url: "ws://localhost:808/inventory", message: "Errno::ECONNREFUSED" }}
  let(:rabbit_push) { described_class.call('incident.inventory', message) }

  it 'call Rabbit correctly' do
    expect(rabbit_push.name).to eq 'incident.inventory'
    expect(rabbit_push.type).to eq :fanout
  end
end
