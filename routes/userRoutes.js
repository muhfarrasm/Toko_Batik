const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Halaman Home
router.get('/', userController.home);

// Halaman Menu Pria
router.get('/menu-pria', userController.menuPria);

// Halaman Menu Wanita
router.get('/menu-wanita', userController.menuWanita);

// Halaman Menu Sale
router.get('/menu-sale', userController.menuSale);

// Halaman About Us
router.get('/about-us', userController.aboutUs);

module.exports = router;
