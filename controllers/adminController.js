const bcrypt = require('bcrypt');
const db = require('../config/database'); // Sambungkan ke file koneksi database Anda

// Login Admin
exports.loginController = async (req, res) => {
  const { username, password } = req.body;

  // Validasi jika username atau password kosong
  if (!username || !password) {
    return res.render('admin/login', { error: 'Username and password are required' });
  }

  try {
    // Query untuk mencari admin berdasarkan username
    const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

    if (rows.length === 0) {
      // Jika username tidak ditemukan
      return res.render('admin/login', { error: 'Invalid username or password' });
    }

    const admin = rows[0];

    // Verifikasi password menggunakan bcrypt
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      // Jika password salah
      return res.render('admin/login', { error: 'Invalid username or password' });
    }

    // Jika login berhasil, simpan session admin dan redirect ke dashboard
    req.session.isAdmin = true;
    req.session.adminId = admin.id; // Simpan ID admin ke session jika diperlukan
    return res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error saat login:', error);
    return res.render('admin/login', { error: 'An error occurred, please try again later.' });
  }
};

// Logout Admin
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error saat logout:', err);
    }
    res.redirect('/admin/login');
  });
};

// Halaman Utama Admin
exports.dashboard = (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect('/admin/login');
  }
  res.render('admin/dashboard');
};

// CRUD Produk Pria
exports.menuPria = (req, res) => {
  // Read: Menampilkan produk pria
  Product.getAll('pria', (err, products) => {
    if (err) return res.send('Error: ' + err);
    res.render('admin/menuPria', { products });
  });
};

// Menambahkan Produk Pria (Create)
exports.createMenuPria = (req, res) => {
  const { name, price, description, image } = req.body;
  const newProduct = { name, price, category: 'pria', description, image };

  Product.create(newProduct, (err, result) => {
    if (err) return res.send('Error: ' + err);
    res.redirect('/admin/menu-pria'); // Setelah menambah produk, redirect ke halaman menuPria
  });
};

// Mengupdate Produk Pria (Update)
exports.updateMenuPria = (req, res) => {
  const { id, name, price, description, image } = req.body;
  const updatedProduct = { name, price, description, image };

  Product.update(id, updatedProduct, (err, result) => {
    if (err) return res.send('Error: ' + err);
    res.redirect('/admin/menu-pria'); // Setelah update produk, redirect ke halaman menuPria
  });
};

// Menghapus Produk Pria (Delete)
exports.deleteMenuPria = (req, res) => {
  const { id } = req.params;
  
  Product.delete(id, (err, result) => {
    if (err) return res.send('Error: ' + err);
    res.redirect('/admin/menu-pria'); // Setelah hapus produk, redirect ke halaman menuPria
  });
};

// CRUD Produk Wanita
exports.menuWanita = (req, res) => {
  // Read: Menampilkan produk wanita
  Product.getAll('wanita', (err, products) => {
    if (err) return res.send('Error: ' + err);
    res.render('admin/menuWanita', { products });
  });
};

// Menambahkan Produk Wanita (Create)
exports.createMenuWanita = (req, res) => {
  const { name, price, description, image } = req.body;
  const newProduct = { name, price, category: 'wanita', description, image };

  Product.create(newProduct, (err, result) => {
    if (err) return res.send('Error: ' + err);
    res.redirect('/admin/menu-wanita');
  });
};

// Mengupdate Produk Wanita (Update)
exports.updateMenuWanita = (req, res) => {
  const { id, name, price, description, image } = req.body;
  const updatedProduct = { name, price, description, image };

  Product.update(id, updatedProduct, (err, result) => {
    if (err) return res.send('Error: ' + err);
    res.redirect('/admin/menu-wanita');
  });
};

// Menghapus Produk Wanita (Delete)
exports.deleteMenuWanita = (req, res) => {
  const { id } = req.params;

  Product.delete(id, (err, result) => {
    if (err) return res.send('Error: ' + err);
    res.redirect('/admin/menu-wanita');
  });
};

// CRUD Produk Sale
exports.menuSale = (req, res) => {
  // Read: Menampilkan produk sale
  Product.getAll('sale', (err, products) => {
    if (err) return res.send('Error: ' + err);
    res.render('admin/menuSale', { products });
  });
};

// Menambahkan Produk Sale (Create)
exports.createMenuSale = (req, res) => {
  const { name, price, description, image } = req.body;
  const newProduct = { name, price, category: 'sale', description, image };

  Product.create(newProduct, (err, result) => {
    if (err) return res.send('Error: ' + err);
    res.redirect('/admin/menu-sale');
  });
};

// Mengupdate Produk Sale (Update)
exports.updateMenuSale = (req, res) => {
  const { id, name, price, description, image } = req.body;
  const updatedProduct = { name, price, description, image };

  Product.update(id, updatedProduct, (err, result) => {
    if (err) return res.send('Error: ' + err);
    res.redirect('/admin/menu-sale');
  });
};

// Menghapus Produk Sale (Delete)
exports.deleteMenuSale = (req, res) => {
  const { id } = req.params;

  Product.delete(id, (err, result) => {
    if (err) return res.send('Error: ' + err);
    res.redirect('/admin/menu-sale');
  });
};
