const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated } = require('../middleware/authMiddleware'); 
const { loginController } = require('../controllers/adminController'); // Mengimpor middleware

// Menambahkan rute GET untuk halaman login
router.get('/login', (req, res) => {
    res.render('admin/login'); // Pastikan path ke tampilan login sesuai
  });
  
  // Menambahkan rute POST untuk proses login
  router.post('/login', loginController); // Controller untuk proses login
  
// Halaman Dashboard (proteksi dengan middleware)
router.get('/dashboard', isAuthenticated, adminController.dashboard);

// CRUD Produk Pria
router.get('/menu-pria', isAuthenticated, adminController.menuPria);  // Proteksi menu pria
router.post('/menu-pria/create', isAuthenticated, adminController.createMenuPria);
router.post('/menu-pria/update', isAuthenticated, adminController.updateMenuPria);
router.get('/menu-pria/delete/:id', isAuthenticated, adminController.deleteMenuPria);

// CRUD Produk Wanita
router.get('/menu-wanita', isAuthenticated, adminController.menuWanita);  // Proteksi menu wanita
router.post('/menu-wanita/create', isAuthenticated, adminController.createMenuWanita);
router.post('/menu-wanita/update', isAuthenticated, adminController.updateMenuWanita);
router.get('/menu-wanita/delete/:id', isAuthenticated, adminController.deleteMenuWanita);

// CRUD Produk Sale
router.get('/menu-sale', isAuthenticated, adminController.menuSale);  // Proteksi menu sale
router.post('/menu-sale/create', isAuthenticated, adminController.createMenuSale);
router.post('/menu-sale/update', isAuthenticated, adminController.updateMenuSale);
router.get('/menu-sale/delete/:id', isAuthenticated, adminController.deleteMenuSale);

module.exports = router;
