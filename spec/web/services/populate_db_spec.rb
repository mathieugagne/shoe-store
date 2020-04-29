# frozen_string_literal: true

require_relative '../../../apps/web/services/populate_db'

describe PopulateDb do
  let(:json_data) do
    {
      'store' => 'test Rosemont la petite patrie',
      'model' => 'ALALIWEN',
      'inventory' => 0
    }
  end
  let(:store) { PStore.new('data/test_rosemont_la_petite_patrie.pstore') }

  before { described_class.call(data: json_data) }

  context 'Create a dedicated PStore file' do
    it 'With the correct path' do
      path = 'data/test_rosemont_la_petite_patrie.pstore'
      expect(File).to exist(path)
    end

    it 'With the correct store key' do
      pstore_keys = store.transaction { store.roots }
      expect(pstore_keys).to eq [:test_rosemont_la_petite_patrie]
    end
  end
end
