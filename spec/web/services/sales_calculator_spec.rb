# frozen_string_literal: true

require_relative '../../../apps/web/services/inventory_calculator'

describe InventoryCalculator do
  let(:model_sales) {{"CADEVEN"=>80, "ADERI"=>85, "BOZZA"=>106, "RASIEN"=>68, "ELOILLAN"=>30, "BUTAUD"=>36, "SCHOOLER"=>59, "SODANO"=>79,     "BEODA"=>94, "VENDOGNUS"=>95, "CADAUDIA"=>81, "ABOEN"=>10, "SEVIDE"=>12, "WUMA"=>96, "GREG"=>83}}
  let(:store_store) {{"ALDO Burlington Mall"=>176, "ALDO Destiny USA Mall"=>38, "ALDO Crossgates Mall"=>192, "ALDO Maine Mall"=>80, "ALDO Waterloo Premium Outlets"=>316, "ALDO Holyoke Mall"=>36, "ALDO Auburn Mall"=>95, "ALDO Centre Eaton"=>81}}

  context 'For model' do
    it 'return sales computed by model' do
      sales_computed = described_class.call(type: 'model', filename: 'spec/support/data.pstore')
      expect(sales_computed).to eq model_sales
    end
  end

  context 'For store' do
    it 'return sales computed by store' do
      sales_computed = described_class.call(type: 'store', filename: 'spec/support/data.pstore')
      expect(sales_computed).to eq store_store
    end
  end
end
