RSpec.describe Web::Controllers::Settings::Create, type: :action do
  attr_reader :response

  let(:action) { described_class.new }
  let(:params) { {"settings"=>{"critical_limit"=>"7", "high_limit"=>"70"}} }
  let(:store) { PStore.new('config/settings.pstore') }

  before do
    @response = action.call(params)
  end
  it 'is redirected' do
    expect(response[1]['location']).to eq '/'
    expect(response[0]).to eq 302
  end

  it 'populate low_stock_settings.pstore' do
    last_setting = store.transaction(true) { store['critical_limit'].last }
    expect(last_setting).to eq '7'
  end

  it 'populate high_stock_settings.pstore' do
    last_setting = store.transaction(true) { store['high_limit'].last }
    expect(last_setting).to eq '70'
  end
end
