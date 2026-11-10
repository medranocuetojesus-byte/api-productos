//Nuestra aplaicacion puede tener muchos modulos:
//Productos > producto.controller > producto.routes
//Clientes > cliente.controller > clientes routes
//Provedores > proveedor.controller > provedor.routes

//Todas las rutas se organizan gracias a index.js (indice)
const { Router } = require('express')

//Esto se realiza por cada routes
const productoRoutes = require('./producto.routes')

//Esto es solo uno para todas las rutas
const router = Router()

//Esto es por cada routes **
router.use('/productos', productoRoutes)

//Se exportan todas las rutas
module.exports = router
