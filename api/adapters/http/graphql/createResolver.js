const DTO = require('../../../libs/DTO');

const createResolver = cb => (args, context) => {
  const dto = new DTO();
  dto.setRaw({ args, context });
  dto.request.setPayload(args.payload);

  return cb(dto).then(() => {
    if (dto.response.hasErrors()) {
      throw new Error(dto.response.getErrors()[0].message);
    }

    return dto.response.getData();
  });
};

module.exports = createResolver;
