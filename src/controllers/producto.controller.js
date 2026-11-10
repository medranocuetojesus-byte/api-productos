// Este archivo tiene la logica de la aplicacion
// 5 preocedemientos: buscar , listar , registar , actualizar , eliminar

// PASO 1
// const objeto = requiere() // Todos los metodos 
// const {otroObjeto} = requiere('') // Todos los metodos  // solo algunas funciones


const { pool } = require('../config/database')
const CAMPOS = 'id, marca, descripcion, precio, stock' // Dato comun

// Todas las funciones seran asincronas (tardaran un tiempo en ser resultas ...)
// milisegundos , segundos (1000 = 1seg)
// Todas las funciones recieben y envian dato (pasarelas)
const listarProductos = (req , res)  => { }

const obtenerProducto = (req , res)  => { }

const crearProductos = (req , res)  => { }

const actualizarProducto = (req , res)  => { }

const eliminarProducto = (req , res)  => { }

// Todos los metodos deben ser EXPORTADO (se utilizara desde la app)
// el que lo utilizara sera "routes"

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProductos,
  actualizarProducto,
  eliminarProducto
}

