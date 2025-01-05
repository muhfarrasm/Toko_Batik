const mysql = require('mysql2');
const db = require('../config/database');  // Mengimpor koneksi ke database

// Halaman Utama User
exports.home = (req, res) => {
    const user = req.user || null;
    res.render('user/home');
};

// Halaman Menu Pria
exports.menuPria = (req, res) => {
  db.query('SELECT * FROM products WHERE category = ?', ['pria'], (err, results) => {
    if (err) {
      return res.send('Error: ' + err);
    }
    res.render('user/menuPria', { products: results });
  });
};

// Halaman Menu Wanita
exports.menuWanita = (req, res) => {
  db.query('SELECT * FROM products WHERE category = ?', ['wanita'], (err, results) => {
    if (err) {
      return res.send('Error: ' + err);
    }
    res.render('user/menuWanita', { products: results });
  });
};

// Halaman Menu Sale
exports.menuSale = (req, res) => {
  db.query('SELECT * FROM products WHERE category = ?', ['sale'], (err, results) => {
    if (err) {
      return res.send('Error: ' + err);
    }
    res.render('user/menuSale', { products: results });
  });
};

// Halaman About Us
exports.aboutUs = (req, res) => {
  res.render('user/aboutUs');
};
