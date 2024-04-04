const mysql = require("mysql2");
require('dotenv').config()
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: "psc2",
  connectionLimit: 10,
});

const connection = pool.promise();

module.exports = { connection };
