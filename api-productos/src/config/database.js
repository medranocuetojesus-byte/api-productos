const mysql = require('mysql2/promise') //Accediendo modulo conexion
const { db } = require('./env')         // Leer y validar los parametros de conexion

//Este archivo gestiona la conexion al server y a la BD
const pool = mysql.createPool({
  host: db.host,
  port:db.port,
  user:db.user,
  password:db.password,
  database:db.database,
  waitForConnections: true,
  connectionLimit:  db.connectionLimit,
  queueLimit: 0
})

//Verificar la conexion 
const probarConexion = async() => {
  const conexion = await pool.getConnection()
  await conexion.ping() //test
  conexion.release() //Desconexión
}

//Export la conexion
module.exports = { pool , probarConexion }
