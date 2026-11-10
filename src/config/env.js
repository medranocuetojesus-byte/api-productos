//Validad que la informacion de .env sea correcta 
require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10
  }
}
