const db = require('../config/database');

const Product = {
  getAll: (category, callback) => {
    const query = 'SELECT * FROM products WHERE category = ?';
    db.query(query, [category], callback);
  },
  create: (data, callback) => {
    const query = 'INSERT INTO products (name, price, category, description, image) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [data.name, data.price, data.category, data.description, data.image], callback);
  },
  update: (id, data, callback) => {
    const query = 'UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?';
    db.query(query, [data.name, data.price, data.description, data.image, id], callback);
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], callback);
  },
};

module.exports = Product;
