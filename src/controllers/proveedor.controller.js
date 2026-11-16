//Este archivo contiene la lógica del módulo PROVEEDORES
//5 funciones: listar, obtener, crear, actualizar, eliminar

const { pool } = require('../config/database')

//Convierte cualquier valor en texto limpio (evita errores si el campo no llega)
const texto = (valor) => String(valor ?? '').trim()

// Validaciones para crear y actualizar
const validarCampos = ({ razonsocial, contacto, ruc, direccion } = {}) => {
  const errores = []
  if (texto(razonsocial) === '') errores.push('La razón social es obligatoria')
  if (texto(contacto) === '') errores.push('El contacto es obligatorio')
  if (!/^\d{11}$/.test(texto(ruc))) errores.push('El RUC debe tener 11 dígitos')
  if (texto(direccion) === '') errores.push('La dirección es obligatoria')
  return errores
}

//Valida que el ID de la URL sea un número entero positivo
const idValido = (valor) => Number.isInteger(Number(valor)) && Number(valor) > 0

const errorServidor = (res, e) => {
  console.error(e)
  //ER_DUP_ENTRY = el RUC ya está registrado (campo UNIQUE)
  if (e.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      ok: false,
      message: 'Ya existe un proveedor con ese RUC'
    })
  }
  res.status(500).json({
    ok: false,
    message: 'Error interno en el servidor'
  })
}

//API REST -> GET http://localhost:3000/api/proveedores
const listarProveedores = async (req, res) => {
  try {
    const [proveedores] = await pool.query('SELECT * FROM proveedores ORDER BY id')
    res.status(200).json({
      ok: true,
      total: proveedores.length,
      data: proveedores
    })
  } catch (e) {
    errorServidor(res, e)
  }
}

//API REST -> GET http://localhost:3000/api/proveedores/1
const obtenerProveedor = async (req, res) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({
        ok: false,
        message: 'El ID debe ser un número entero mayor a cero'
      })
    }
    const id = Number(req.params.id)

    const [registro] = await pool.execute('SELECT * FROM proveedores WHERE id = ?', [id])

    if (registro.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No existe el proveedor'
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

//API REST -> POST http://localhost:3000/api/proveedores
const crearProveedor = async (req, res) => {
  try {
    const errores = validarCampos(req.body)
    if (errores.length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'Verifique los datos solicitados',
        errores
      })
    }

    const { razonsocial, contacto, ruc, direccion } = req.body
    const consulta = `INSERT INTO proveedores (razonsocial, contacto, ruc, direccion)
                      VALUES (?,?,?,?)`
    const [registro] = await pool.execute(consulta, [
      texto(razonsocial), texto(contacto), texto(ruc), texto(direccion)
    ])

    res.status(201).json({
      ok: true,
      message: 'Proveedor registrado correctamente',
      id: registro.insertId
    })
  } catch (e) {
    errorServidor(res, e)
  }
}

//API REST -> PUT http://localhost:3000/api/proveedores/1
const actualizarProveedor = async (req, res) => {
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

    const { razonsocial, contacto, ruc, direccion } = req.body
    const consulta = `UPDATE proveedores
                      SET razonsocial = ?, contacto = ?, ruc = ?, direccion = ?,
                          updated_at = NOW()
                      WHERE id = ?`
    const [resultado] = await pool.execute(consulta, [
      texto(razonsocial), texto(contacto), texto(ruc), texto(direccion), id
    ])

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No existe el proveedor'
      })
    }

    res.status(200).json({
      ok: true,
      message: 'Proveedor actualizado correctamente'
    })
  } catch (e) {
    errorServidor(res, e)
  }
}

//API REST -> DELETE http://localhost:3000/api/proveedores/1
const eliminarProveedor = async (req, res) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({
        ok: false,
        message: 'El ID debe ser un número entero mayor a cero'
      })
    }
    const id = Number(req.params.id)

    const [resultado] = await pool.execute('DELETE FROM proveedores WHERE id = ?', [id])

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: 'No existe el proveedor'
      })
    }

    res.status(200).json({
      ok: true,
      message: 'Proveedor eliminado correctamente'
    })
  } catch (e) {
    errorServidor(res, e)
  }
}

//Todos los métodos se EXPORTAN para que los utilice "proveedor.routes.js"
module.exports = {
  listarProveedores,
  obtenerProveedor,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
}
