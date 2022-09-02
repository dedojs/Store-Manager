const validate = (data) => {
  let resp = {};
  data.forEach(({ productId, quantity }) => {
    // console.log(productId, quantity);
    if (!productId) resp = { code: 400, message: '"productId" is required' };
    if (quantity <= 0) {
      resp = {
        code: 422,
        message: '"quantity" must be greater than or equal to 1',
      };
    }
    if (quantity === undefined) resp = { code: 400, message: '"quantity" is required' };
  });
  return resp;
};

  module.exports = {
    validate,
  };
