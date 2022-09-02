const ProductModel = require('../models/productsModel');

function validateProduct(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
}

function verifyItem(err, req, res, next) {
  const data = req.body;
  data.forEach(async ({ productId }) => {
    const item = await ProductModel.findById(productId);
    console.log('mid', item);
    return res.status(400).json({ message: '"erro no carai do id' });
  });
  next(err);
}

/*
const verifyArray = async (req, res, next) => {
  const r = [];
  const data = req.body;
  const resposta = data.map(async ({ productId }) => {
    const teste = await ProductModel.findById(productId);
    return teste;
  });
  await Promise.all(resposta).then((item) => r.push(item));
  const answer = r[0].map((item) => item === undefined);
  if (answer === true) {
    return res.status(404).json({ message: 'Product not found' });
  }
  if (answer === false) {
    console.log(answer);
    return answer;
  }
  next();
};

function verifyProductId(req, res, next) {
  const data = req.body;
  data.map(({ productId, quantity }) => {
    if (!productId) return res.status(400).json({ message: '"productId" is required' });
    if (quantity <= 0) {
      return res
        .status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
    return data;
  });
  next();
}
*/

module.exports = {
  validateProduct,
  verifyItem,
};
