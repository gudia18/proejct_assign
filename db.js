const mysql = require('mysql2/promise'); // Use the promise version

// Create a connection pool to the database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Gudi@coder1818',
  database: 'contact',
  waitForConnections: true,
  connectionLimit: 10, // Limit the number of connections
  queueLimit: 0 // Unlimited queue
});

// Test the database connection
async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log('Database is connected');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testConnection();

module.exports = pool;  // Export the pool
