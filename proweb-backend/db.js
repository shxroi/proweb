// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nama_database',
  password: 'yourpassword',
  port: 5432,
});

module.exports = pool;