function updateTable(json) {
  incrementTable(json, 'model')
  incrementTable(json, 'store')
  incrementTimeline(json)
}

function incrementTable(json, type) {
  const item = json[type];
  const dasherize_class = dasherize(item)
  const value = json['inventory'];

  const val = $(`.${dasherize_class}`).text()
   if (val == '') {
     return  $(`#${type}_alert tr:last`).after(`<tr><td>${item}</td><td class="${dasherize_class}">1</td><tr>`);
   };
   $(`.${dasherize_class}`).text(parseInt(val) + 1)
};

function incrementTimeline(json) {
  const store = json['store'];
  const model = json['model'];
  const dasherize_class = dasherize(store)
  const inventory = json['inventory'];

  const val = $(`.${dasherize_class}`).text()

  return  $('#timeline_alert tr:first').after(`<tr><th scope="row">${store}</th><td>${model}</td><td>${inventory}</td><td>${new Date().toLocaleTimeString()}</td></tr>`);
};

function dasherize(value) {
  return value.replace(/\s/g, "_").toLowerCase()
}
