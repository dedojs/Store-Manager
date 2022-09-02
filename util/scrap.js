/*
AbortController
const createSalesProds = async (req, res, next) => {
  try {
    const data = req.body;
    let result = {};
    const id = await SalesService.createSales(
      data[0].productId,
      data[0].quantity
    );

    const response = data.map(async ({ productId, quantity }) => {
      const teste = await SalesService.createSalesProds(
        id,
        productId,
        quantity
      );
      if (teste.message)
        return res.status(teste.code).json({ message: teste.message });
      if (teste) result = { id, itemsSold: data };
    });
    await Promise.all(response).then(() => res.status(201).json(result));

    return res.status(404).json({ message: "Product not found" });
  } catch (err) {
    next(err);
  }
};

function verifyProductId(req, res, next) {
  const data = req.body;
  data.map(({ productId, quantity }) => {
    if (!productId)
      return res.status(400).json({ message: '"productId" is required' });
    if (quantity <= 0) {
      return res
        .status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!quantity)
      return res.status(400).json({ message: '"quantity" is required' });
    return data;
  });
  next();
}

const verifyArray = async (data) => {
  const r = [];
  const resposta = data.map(async ({ productId }) => {
    const teste = await ProductModel.findById(productId);
    return teste;
  });
  await Promise.all(resposta).then((item) => r.push(item));
  const answer = r[0].map((item) => item === undefined);
  if (answer) return { code: 404, message: "Product not found" };
};

const createSales = async (prodId, quant) => {
  const validations = validate(prodId, quant);
  if (validations.message) return validations;
  const findProdId = await ProductModel.findById(prodId);
  if (!findProdId) return { code: 404, message: "Product not found" };
  if (validations && findProdId) {
    const id = await SalesModel.createSales();
    return id;
  }
};

ServiceWorker
const createSalesProds = async (id, prodId, quant) => {
  const validations = validate(prodId, quant);
  if (validations.message) return validations;

  const findProdId = await ProductModel.findById(prodId);
  if (!findProdId) return { code: 404, message: "Product not found" };

  const saleData = await SalesModel.createSalesProds(id, prodId, quant);
  console.log("service", id, prodId, quant);
  return saleData;
};
*/
