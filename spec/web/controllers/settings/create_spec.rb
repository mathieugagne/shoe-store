RSpec.describe Web::Controllers::Settings::Create, type: :action do
  attr_reader :response

  let(:action) { described_class.new }
  let(:params) { {"settings"=>{"critical_limit"=>"7"}} }
  let(:store) { PStore.new('config/settings.pstore') }

  before do
    @response = action.call(params)
  end
  it 'is redirected' do
    expect(response[1]['location']).to eq '/'
    expect(response[0]).to eq 302
  end

  it 'populate settings.pstore' do
    last_setting = store.transaction(true) { store['limit'].last }
    expect(last_setting).to eq '7'
  end
end
