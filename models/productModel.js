const mysql = require('mysql2');
const db = require('../config/database'); // Assuming the connection setup is in this file

const Product = {
  // Get all products based on category
  getAll: (category, callback) => {
    const query = 'SELECT * FROM products WHERE category = ?';
    db.query(query, [category], (err, results) => {
      if (err) {
        return callback(err); // Pass the error to the callback
      }
      callback(null, results); // Pass the results to the callback
    });
  },

  // Create a new product
  create: (data, callback) => {
    const query = 'INSERT INTO products (name, price, category, description, image) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [data.name, data.price, data.category, data.description, data.image], (err, result) => {
      if (err) {
        return callback(err); // Pass the error to the callback
      }
      callback(null, result); // Pass the result to the callback
    });
  },

  // Update an existing product
  update: (id, data, callback) => {
    const query = 'UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?';
    db.query(query, [data.name, data.price, data.description, data.image, id], (err, result) => {
      if (err) {
        return callback(err); // Pass the error to the callback
      }
      callback(null, result); // Pass the result to the callback
    });
  },

  // Delete a product
  delete: (id, callback) => {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return callback(err); // Pass the error to the callback
      }
      callback(null, result); // Pass the result to the callback
    });
  },
};

module.exports = Product;
