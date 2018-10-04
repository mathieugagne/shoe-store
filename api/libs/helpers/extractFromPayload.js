/* eslint-disable no-param-reassign */
const execute = keys => dto => {
  if (typeof keys === 'string') {
    keys = { [keys]: keys };
  }

  if (typeof keys === 'undefined') {
    keys = Object.keys(dto.request.getPayload());
  }

  if (Array.isArray(keys)) {
    keys = keys.reduce((carry, key) => {
      carry[key] = key;

      return carry;
    }, {});
  }

  Object.keys(keys).forEach(key => {
    const keyInData = keys[key];

    dto.setData(keyInData, dto.request.getPayload(key));
  });

  return Promise.resolve(dto);
};

module.exports = {
  execute,
};
