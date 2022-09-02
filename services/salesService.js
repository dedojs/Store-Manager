const SalesModel = require('../models/salesModel');
const ProductModel = require('../models/productsModel');
const { validate } = require('../util');

const getAllSales = async () => {
  const salesData = SalesModel.getAllSales();
  return salesData;
};

const findSaleById = async (id) => {
  const saleData = SalesModel.findSaleById(id);
  return saleData;
};

const createSalesProds = async (data) => {
  const validations = validate(data);
  if (validations.message) return validations;
  // console.log(validations);
  const prodId = await Promise.all(data.map(({ productId }) => ProductModel.findById(productId)));
  // console.log('q', prodId);
  const verify = prodId.some((item) => item === undefined);
  // console.log(verify);
  if (verify) return { code: 404, message: 'Product not found' };
  const id = await SalesModel.createSales();
  // console.log(id);
  await Promise.all(data.map(({ productId, quantity }) =>
    SalesModel.createSalesProds(id, productId, quantity)));

  return { id, itemsSold: data };
};

const deleteSales = async (id) => {
  const sale = SalesModel.deleteSales(id);
  return sale;
};

const editSales = async (id, data) => {
  const validations = validate(data);
  if (validations.message) return validations;
  
  const prodId = await Promise.all(
    data.map(({ productId }) => ProductModel.findById(productId)),
  );
  // console.log('q', prodId);
  const verify = prodId.some((item) => item === undefined);
  // console.log(verify);
  if (verify) return { code: 404, message: 'Product not found' };

  await Promise.all(
    data.map(({ productId, quantity }) =>
      SalesModel.editSales(id, productId, quantity)),
);
  return { id, itemsSold: data };
};

module.exports = {
  getAllSales,
  findSaleById,
  createSalesProds,
  deleteSales,
  editSales,
};
