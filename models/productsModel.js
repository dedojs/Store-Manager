const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [products] = await connection.execute(query);
  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [products] = await connection.execute(query, [id]);
  return products[0];
};

const addProduct = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [result] = await connection.execute(query, [name]);
  return result;
};

const editProduct = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(query, [name, id]);
  return result;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id=?';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const searchProduct = async (name) => {
  const query = `SELECT * FROM StoreManager.products WHERE name LIKE "%${name}%"`;
  const [result] = await connection.execute(query);
  return result;
};

module.exports = {
  getAll,
  findById,
  addProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};
