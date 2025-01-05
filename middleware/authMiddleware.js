// middleware/authMiddleware.js

function isAuthenticated(req, res, next) {
    if (req.session && req.session.isAdmin) {
      // Jika admin sudah login, lanjutkan ke halaman berikutnya
      return next();
    } else {
      // Jika belum login, redirect ke halaman login
      res.redirect('/admin/login');
    }
  }
  
  module.exports = { isAuthenticated };
  