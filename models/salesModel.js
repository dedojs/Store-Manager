const connection = require('./connection');

const getAllSales = async () => {
  const query = `SELECT sp.sale_id as saleId, sp.product_id as productId,
    sp.quantity, sa.date FROM StoreManager.sales_products as sp
    INNER JOIN StoreManager.sales AS sa
    ON sp.sale_id = sa.id`;
  const [sales] = await connection.execute(query);
  return sales;
};

const findSaleById = async (id) => {
  const query = `SELECT sa.date, sp.product_id as productId, sp.quantity
    FROM StoreManager.sales_products as sp
    INNER JOIN StoreManager.sales AS sa
    ON sp.sale_id = sa.id
    WHERE sp.sale_Id = ?`;
  const [sales] = await connection.execute(query, [id]);
  return sales;
};

const createSales = async () => {
  const date = new Date();
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (?)';
  const [result] = await connection.execute(query, [date]);
  return result.insertId;
};

const createSalesProds = async (id, prodId, quant) => {
  const productId = 'product_id';
  const query = `INSERT INTO StoreManager.sales_products
  (sale_id, ${productId}, quantity) VALUES (?, ?, ?)`;
  const [result] = await connection.execute(query, [id, prodId, quant]);
  return result;
};

const deleteSales = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id=?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const editSales = async (saleId, prodId, quant) => {
  const productId = 'product_id';
  const query = `UPDATE StoreManager.sales_products
    SET quantity = ? WHERE sale_id = ? AND ${productId} = ?`;
  const [result] = await connection.execute(query, [quant, saleId, prodId]);
  return result;
};

module.exports = {
  getAllSales,
  findSaleById,
  createSalesProds,
  createSales,
  deleteSales,
  editSales,
};
