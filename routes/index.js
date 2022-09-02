const express = require('express');

const middlewares = require('../middlewares');

const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products', productsController.getAll);
router.get('/products/search', productsController.searchProduct);
router.get('/products/:id', productsController.findById);
router.post('/products', middlewares.validateProduct, productsController.addProduct);
router.put('/products/:id', middlewares.validateProduct, productsController.editProduct);
router.delete('/products/:id', productsController.deleteProduct);

const SalesController = require('../controllers/salesController');

router.get('/sales', SalesController.getAllSales);
router.get('/sales/:id', SalesController.findSaleById);
router.post('/sales', SalesController.createSalesProds);
router.delete('/sales/:id', SalesController.deleteSales);
router.put('/sales/:id', SalesController.editSales);

module.exports = router;
