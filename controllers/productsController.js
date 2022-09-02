const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  try {
    const product = await productsService.getAll();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await productsService.addProduct({ name });

    if (!product) {
      return res.status(400).json({ message: '"name" is required' });
    }
    const id = product.insertId;
    return res.status(201).json({ id, name });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const product = { id, name };

    const findProduct = await productsService.findById(id);

    if (!findProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productsService.editProduct(id, name);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await productsService.findById(id);
    if (!findProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productsService.deleteProduct(id);
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { q } = req.query;
    const findProducts = await productsService.searchProduct(q);
    if (findProducts.length === 0 || q === '') {
      console.log('aqui');
      const allProducts = await productsService.getAll();
      return res.status(200).json(allProducts);
    }
    return res.status(200).json(findProducts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  findById,
  getAll,
  addProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};
