# frozen_string_literal: true

require_relative '../../../apps/web/services/populate_db'

describe PopulateDb do
  let(:json_data_low_stock) do
    {
      'store' => 'test Rosemont la petite patrie',
      'model' => 'ALALIWEN',
      'inventory' => 0
    }
  end

  let(:json_data_safe_stock) do
    {
      'store' => 'test Rosemont la petite patrie',
      'model' => 'MIGO',
      'inventory' => 20
    }
  end

  describe 'Call ShoeLine with an inventory' do
    context 'critical' do
      it do
        expect(ShoeLine).to receive(:new)
          .with(data: json_data_low_stock,
                filename: 'critical_stock',
                low_stock: true)

        described_class.call(data: json_data_low_stock)
      end
    end
    context 'safe' do
      it do
        expect(ShoeLine).to receive(:new)
          .with(data: json_data_safe_stock,
                filename: 'test_rosemont_la_petite_patrie',
                low_stock: false)

        described_class.call(data: json_data_safe_stock)
      end
    end
  end
end
