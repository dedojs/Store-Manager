const SalesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  try {
    const sales = await SalesService.getAllSales();
    if (!sales) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const findSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SalesService.findSaleById(id);
    if (!sale || sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSalesProds = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await SalesService.createSalesProds(data);
    // console.log('controller', response);
    if (response.message) return res.status(response.code).json({ message: response.message });
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

const deleteSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await SalesService.findSaleById(id);
    // console.log(sale);
    if (!sale || sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    await SalesService.deleteSales(id);
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const editSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleId = id;
    const data = req.body;

    const sale = await SalesService.findSaleById(id);
    // console.log(sale);
    if (!sale || sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    const response = await SalesService.editSales(id, data);
    if (response.message) return res.status(response.code).json({ message: response.message });
    const object = [{ saleId, itemsUpdated: data }];
    return res.status(200).json(object[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllSales,
  findSaleById,
  createSalesProds,
  deleteSales,
  editSales,
};
