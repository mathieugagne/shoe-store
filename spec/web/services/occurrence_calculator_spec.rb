# frozen_string_literal: true

require_relative '../../../apps/web/services/occurrence_calculator'

describe OccurrenceCalculator do
  let(:data) {["ALDO Solomon Pond Mall", "ALDO Solomon Pond Mall", "ALDO Waterloo Premium Outlets"]}
  let(:result) {[["ALDO Solomon Pond Mall", 2], ["ALDO Waterloo Premium Outlets", 1]]}

  it 'Return an array with stores and the number of alert (low stock)' do
    occurrence_computed = described_class.call(data: data)
    expect(occurrence_computed).to eq result
  end
end
