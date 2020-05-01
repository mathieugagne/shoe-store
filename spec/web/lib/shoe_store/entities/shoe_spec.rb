# frozen_string_literal: true

require_relative '../../../../../lib/shoe_store/entities/shoe_line'

RSpec.describe ShoeLine do
  let(:json_data_low_stock) do
    {
      'store' => 'ALDO Crossgates Mall',
      'model' => 'ALALIWEN',
      'inventory' => 0
    }
  end

  let(:json_data_safe_stock) do
    {
      'store' => 'ALDO Crossgates Mall',
      'model' => 'MIGO',
      'inventory' => 20
    }
  end

  let(:store) { PStore.new('data/aldo_crossgates_mall.pstore') }

  before do
    described_class.new(filename: 'aldo_crossgates_mall',
                        data: json_data_low_stock,
                        low_stock: false)
  end

  describe 'Create a store file' do
    before do
      described_class.new(filename: 'critical_stock',
                          data: json_data_low_stock,
                          low_stock: true)
    end

    context 'for a critical stock' do
      it do
        path = 'data/critical_stock.pstore'
        expect(File).to exist(path)
      end
    end

    context 'for a safe stock' do
      it do
        path = 'data/aldo_crossgates_mall.pstore'
        expect(File).to exist(path)
      end
    end
  end

  it 'With the correct store key' do
    pstore_keys = store.transaction { store.roots }
    expect(pstore_keys).to eq [:aldo_crossgates_mall]
  end
end
