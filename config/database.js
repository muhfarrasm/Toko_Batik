require('dotenv').config(); // Memuat variabel lingkungan dari file .env
const mysql = require('mysql2');

// Membuat koneksi ke database dengan variabel lingkungan dari file .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Menghubungkan ke database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Ekspor koneksi database agar bisa digunakan di file lain
module.exports = db;
