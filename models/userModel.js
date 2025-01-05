const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const db = require('../config/database'); // Pastikan Anda menyesuaikan file database config

const User = {
  // Verifikasi login
  authenticate: (username, password, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    
    // Query database
    db.query(query, [username], (err, results) => {
      if (err) return callback(err); // Return any database errors
      if (results.length === 0) return callback(null, null); // No user found with this email

      const user = results[0]; // Get the first user from the result set

      // Implementasikan bcrypt untuk memverifikasi password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return callback(err); // Return any bcrypt errors
        if (isMatch) return callback(null, user); // Passwords match
        return callback(null, null); // Passwords don't match
      });
    });
  },
};

module.exports = User;
