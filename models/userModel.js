const mysql = require('mysql2');
const db = require('../config/database');  // Pastikan Anda menyesuaikan file database config

const User = {
  // Verifikasi login
  authenticate: (email, password, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      const user = results[0];
      // Implementasikan bcrypt untuk memverifikasi password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return callback(err);
        if (isMatch) return callback(null, user);
        return callback(null, null);
      });
    });
  },
};

module.exports = User;
