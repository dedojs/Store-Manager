const productModel = require('../models/productsModel');

const getAll = async () => {
  const productData = await productModel.getAll();
  return productData;
};

const findById = async (id) => {
  const productData = await productModel.findById(id);
  if (!productData) return null;
  return productData;
};

const addProduct = async ({ name }) => {
  const nameProduct = await productModel.addProduct({ name });
  return nameProduct;
};

const editProduct = async (id, name) => {
  const productData = await productModel.editProduct(id, name);
  return productData;
};

const deleteProduct = async (id) => {
  const productData = await productModel.deleteProduct(id);
  return productData;
};

const searchProduct = async (name) => {
  const productData = await productModel.searchProduct(name);
  return productData;
};

module.exports = {
  findById,
  getAll,
  addProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};
