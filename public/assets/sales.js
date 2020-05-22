function updateNumberOfSales(json, item, section) {
  const subject = json[item];
  const dasherize_class = dasherize(subject)
  const value = json['inventory'];

  const val = $(`.${dasherize_class}_${section}`).text()
  if (val == '') {
    return  $(`#${section}_table tr:first`).after(`<tr><th scope="row">${subject}</th><td class=${dasherize_class}_${section}>1</td></tr>`);
  };
  $(`.${dasherize_class}_${section}`).text(parseInt(val) + 1)
};

function updateStockRemaining(json, item, section) {
  const subject = json[item];
  const dasherize_class = dasherize(subject)
  const value = json['inventory'];

  const val = $(`.${dasherize_class}_${section}`).text()
  if (val == '') {
    return  $(`#${section}_table tr:first`).after(`<tr><th scope="row">${subject}</th><td class=${dasherize_class}_${section}>${value}</td></tr>`);
  };
  $(`.${dasherize_class}_${section}`).text(parseInt(val) + value)
};

function dasherize(value) {
  return value.replace(/\s/g, "_").toLowerCase()
}
