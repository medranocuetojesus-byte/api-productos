const { Router } = require('express') // manejador de ruta
const controller = require('../controllers/cliente.controller') // Controlador (lógica)

const router = Router() // Cada verbo HTTP se asocia a una función del controlador

router.get('/', controller.listarClientes)          // GET    /api/clientes
router.get('/:id', controller.obtenerCliente)       // GET    /api/clientes/1
router.post('/', controller.crearCliente)           // POST   /api/clientes
router.put('/:id', controller.actualizarCliente)    // PUT    /api/clientes/1
router.delete('/:id', controller.eliminarCliente)   // DELETE /api/clientes/1

module.exports = router
