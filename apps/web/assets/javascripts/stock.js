const critical_limit = $('.critical_limit_value').text();
const high_limit = $('.high_limit_value').text();

function displayStockInformation() {
  let json = JSON.parse(event.data);
  const warningId = Math.random().toString(36).substring(2);
  $("#warning").append(`<div id=${warningId} class=${stockLevel(json)}>${stockInformation(json)}</div>`)
               .delay(1000)
               .fadeIn();
  if (json['inventory'] <= critical_limit) {
    updateTable(json)
  };

  updateNumberOfSales(json, 'model', 'sales_per_model')
  updateNumberOfSales(json, 'store', 'sales_per_store')
  updateStockRemaining(json, 'store', 'stock_per_store')
  updateStockRemaining(json, 'model', 'stock_per_model')

  $(`#${warningId}`).delay(10000).fadeOut(5000);
};

function stockInformation(json) {
  const store = json['store'];
  const model = json['model'];
  const inventory = json['inventory'];
  return `<strong>${store}</strong> : ${model} (${inventory})`;
};

function stockLevel(json) {
  const inventory = json['inventory'];
  if (json['inventory'] <= critical_limit) {
    return  `critical_limit`;
  } else if (json['inventory'] >= high_limit) {
    return `high_limit`;
  } else {
    return `safe`;
  };
};

function unableToConnectMessage() {
  alert('Sorry, something wrong happens, unable to fetch inventory. Please contact the dev team.');
}
