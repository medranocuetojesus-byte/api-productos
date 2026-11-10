const { Router } = require('express') // manejador de ruta
const controller= require('../controllers/producto.controller') // Controlador (logico)

const router = Router() // Considerar los verbo

router.get( '/' ,controller.listarProductos)
router.get( '/:id' ,controller.obtenerProducto)
router.post('/',controller.crearProducto)

// Pendiente ... PUT , POST, DELETE

module.exports = router

