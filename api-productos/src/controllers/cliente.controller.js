//Este archivo contiene la lógica del módulo CLIENTES
//5 funciones: listar, obtener, crear, actualizar, eliminar

const { pool } = require('../config/database')

//Convierte cualquier valor en texto limpio (evita errores si el campo no llega)
const texto = (valor) => String(valor ?? '').trim()

// Validaciones para crear y actualizar
const validarCampos = ({ apellidos, nombres, telefono, direccion, email } = {}) => {
  const errores = []
  if (texto(apellidos) === '') errores.push('Los apellidos son obligatorios')
  if (texto(nombres) === '') errores.push('Los nombres son obligatorios')
  if (!/^\d{9}$/.test(texto(telefono))) errores.push('El teléfono debe tener 9 dígitos')
  if (texto(direccion) === '') errores.push('La dirección es obligatoria')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto(email))) errores.push('El email no es válido')
  return errores
}

//Valida que el ID de la URL sea un número entero positivo
const idValido = (valor) => Number.isInteger(Number(valor)) && Number(valor) > 0

const errorServidor = (res, e) => {
  console.error(e)
  //ER_DUP_ENTRY = el email ya está registrado (campo UNIQUE)
  if (e.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      ok: false,
      message: 'Ya existe un cliente con ese email'
    })
  }
  res.status(500).json({
    ok: false,
    message: 'Error interno en el servidor'
  })
}

//API REST -> GET http://localhost:3000/api/clientes
const listarClientes = async (req, res) => {
  try {
    const [clientes] = await pool.query('SELECT * FROM clientes ORDER BY id')
    res.status(200).json({
      ok: true,
      total: clientes.length,
      data: clientes
    })
  } catch (e) {
    errorServidor(res, e)
  }
}

//API REST -> GET http://localhost:3000/api/clientes/1
const obtenerCliente = async (req, res) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({
        ok: false,
        message: 'El ID debe ser un número entero mayor a cero'
      })
    }
    const id = Number(req.params.id)

    const [registro] = await pool.execute('SELECT * FROM clientes WHERE id = ?', [id])

    if (registro.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No existe el cliente'
      })
    }

    res.status(200).json({
      ok: true,
      data: registro[0]
    })
  } catch (e) {
    errorServidor(res, e)
  }
}

//API REST -> POST http://localhost:3000/api/clientes
const crearCliente = async (req, res) => {
  try {
    const errores = validarCampos(req.body)
    if (errores.length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores
      })
    }

    const { apellidos, nombres, telefono, direccion, email } = req.body
    const consulta = `INSERT INTO clientes (apellidos, nombres, telefono, direccion, email)
                      VALUES (?,?,?,?,?)`
    const [registro] = await pool.execute(consulta, [
      texto(apellidos), texto(nombres), texto(telefono), texto(direccion), texto(email)
    ])

    res.status(201).json({
      ok: true,
      message: 'Cliente registrado correctamente',
      id: registro.insertId
    })
  } catch (e) {
    errorServidor(res, e)
  }
}

//API REST -> PUT http://localhost:3000/api/clientes/1
const actualizarCliente = async (req, res) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({
        ok: false,
        message: 'El ID debe ser un número entero mayor a cero'
      })
    }
    const id = Number(req.params.id)

    const errores = validarCampos(req.body)
    if (errores.length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores
      })
    }

    const { apellidos, nombres, telefono, direccion, email } = req.body
    const consulta = `UPDATE clientes
                      SET apellidos = ?, nombres = ?, telefono = ?, direccion = ?, email = ?,
                          updated_at = NOW()
                      WHERE id = ?`
    const [resultado] = await pool.execute(consulta, [
      texto(apellidos), texto(nombres), texto(telefono), texto(direccion), texto(email), id
    ])

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No existe el cliente'
      })
    }

    res.status(200).json({
      ok: true,
      message: 'Cliente actualizado correctamente'
    })
  } catch (e) {
    errorServidor(res, e)
  }
}

//API REST -> DELETE http://localhost:3000/api/clientes/1
const eliminarCliente = async (req, res) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({
        ok: false,
        message: 'El ID debe ser un número entero mayor a cero'
      })
    }
    const id = Number(req.params.id)

    const [resultado] = await pool.execute('DELETE FROM clientes WHERE id = ?', [id])

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No existe el cliente'
      })
    }

    res.status(200).json({
      ok: true,
      message: 'Cliente eliminado correctamente'
    })
  } catch (e) {
    errorServidor(res, e)
  }
}

//Todos los métodos se EXPORTAN para que los utilice "cliente.routes.js"
module.exports = {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
}
