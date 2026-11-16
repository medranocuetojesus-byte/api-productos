const { Router } = require('express') // manejador de ruta
const controller = require('../controllers/proveedor.controller') // Controlador (lógica)

const router = Router() // Cada verbo HTTP se asocia a una función del controlador

router.get('/', controller.listarProveedores)          // GET    /api/proveedores
router.get('/:id', controller.obtenerProveedor)        // GET    /api/proveedores/1
router.post('/', controller.crearProveedor)            // POST   /api/proveedores
router.put('/:id', controller.actualizarProveedor)     // PUT    /api/proveedores/1
router.delete('/:id', controller.eliminarProveedor)    // DELETE /api/proveedores/1

module.exports = router
