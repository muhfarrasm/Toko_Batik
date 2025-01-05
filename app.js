const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
dotenv.config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET, // Ganti dengan nilai secret yang aman
  resave: false,
  saveUninitialized: true,
}));

// Set Views
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public/css')));
app.set('view engine', 'ejs');

// Serve static files (CSS, JS, Images)
app.use(express.static('public'));

// Routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

// Rute Admin
app.use('/admin', adminRoutes);

// Rute User
app.use('/', userRoutes);

// Rute untuk halaman utama (home) untuk User
app.get('/', (req, res) => {
  res.render('user/home', { title: 'Home' });
});

// Rute untuk halaman "Menu Pria" untuk User
app.get('/menu-pria', (req, res) => {
  res.render('user/menuPria', { title: 'Menu Produk Pria' });
});

// Rute untuk halaman "Menu Wanita" untuk User
app.get('/menu-wanita', (req, res) => {
  res.render('user/menuWanita', { title: 'Menu Produk Wanita' });
});

// Rute untuk halaman "Sale" untuk User
app.get('/menu-sale', (req, res) => {
  res.render('user/menuSale', { title: 'Menu Sale' });
});

// Rute untuk halaman "About Us" untuk User
app.get('/about-us', (req, res) => {
  res.render('user/aboutUs', { title: 'About Us' });
});

// Halaman Login untuk Admin
app.get('/admin/login', (req, res) => {
  res.render('admin/login', { title: 'Login' });
});

// Rute Admin Dashboard
app.get('/admin/dashboard', (req, res) => {
  // Cek apakah admin sudah login
  if (req.session.isAdmin) {
    res.render('admin/dashboard', { title: 'Admin Dashboard' });
  } else {
    res.redirect('/admin/login'); // Arahkan ke halaman login jika admin belum login
  }
});

// Halaman Logout untuk Admin
app.get('/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/admin/dashboard');
    }
    res.clearCookie('connect.sid');
    res.redirect('/admin/login');
  });
});

// Server
app.listen(2000, () => {
  console.log(`Server running at http://localhost:${2000}/`);
});
