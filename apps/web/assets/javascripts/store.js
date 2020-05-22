function updateStockRemainingPerStore(json) {
  const store = json['store'];
  const model = json['model'];

  const dasherize_class = `${dasherize(store)}${dasherize(model)}`
  const value = json['inventory'];

  const val = $(`#${dasherize_class}`).text()
  const newVal = parseInt(val) + value

  if (val == '') {
    updateLowOrHighValue(store, value, model)
    return $(`#store-reporting_${dasherize(store)} tr:last`).after(`<tr>
                                                                      <th scope="row">${model}</th>
                                                                      <td id=${dasherize_class}>${value}</td>
                                                                    </tr>`);
  } else {
    $(`#${dasherize_class}`).text(newVal)
    return updateLowOrHighValue(store, newVal, model)
  }

};

function updateLowOrHighValue(store, newVal, model) {
  const lowestVal = $(`.low-value${dasherize(store)}`).text()
  const highestVal = $(`.high-value${dasherize(store)}`).text()
  const newLowestStock = newVal < parseInt(lowestVal)
  const newHighestStock = newVal > parseInt(highestVal)

  if (newHighestStock) {
    replaceValue('high', store, model, newVal)
  } else if (newLowestStock) {
    replaceValue('low', store, model, newVal)
  }
}

function replaceValue(classe, store, model, newVal) {
  $(`.${classe}-value-data${dasherize(store)}`).replaceWith(`<div class="${classe}-value-data${dasherize(store)}">
                                                              <span>${model}</span>
                                                              <span class="${classe}-value${dasherize(store)}">${newVal}</span>
                                                            </div>`)
}

function dasherize(value) {
  return value.replace(/\s/g, "_").toLowerCase()
}
