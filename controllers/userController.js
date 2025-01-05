const Product = require('../models/productModel');

// Halaman Utama User
exports.home = (req, res) => {
    const user = req.user || null;
  res.render('user/home');
};

// Halaman Menu Pria
exports.menuPria = (req, res) => {
  Product.getAll('pria', (err, products) => {
    if (err) return res.send('Error: ' + err);
    res.render('user/menuPria', { products });
  });
};

// Halaman Menu Wanita
exports.menuWanita = (req, res) => {
  Product.getAll('wanita', (err, products) => {
    if (err) return res.send('Error: ' + err);
    res.render('user/menuWanita', { products });
  });
};

// Halaman Menu Sale
exports.menuSale = (req, res) => {
  Product.getAll('sale', (err, products) => {
    if (err) return res.send('Error: ' + err);
    res.render('user/menuSale', { products });
  });
};

// Halaman About Us
exports.aboutUs = (req, res) => {
  res.render('user/aboutUs');
};
