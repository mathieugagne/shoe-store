const DTO = require('../../libs/DTO');

const createEventHandler = cb => rawPayload => {
  const dto = new DTO();
  dto.setRaw({ rawPayload });

  const payload = JSON.parse(rawPayload);
  dto.request.setPayload(payload);

  return cb(dto).then(() => {
    if (dto.response.hasErrors()) {
      // TODO: Handle error properly!
      throw new Error(dto.response.getErrors()[0].message);
    }

    console.log('Event handled!');
  });
};

module.exports = createEventHandler;
