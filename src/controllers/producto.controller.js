// Este archivo tiene la logica de la aplicacion
// 5 preocedemientos: buscar , listar , registar , actualizar , eliminar

// PASO 1
// const objeto = requiere() // Todos los metodos 
// const {otroObjeto} = requiere('') // Todos los metodos  // solo algunas funciones

const listarProductos = async(req, res) => {
  //Se utilizar try - catch porque existe una probabilidad de error
  try{
    //Deserialización (obtener el primer el elemento del arreglo)
    const [productos] = await pool.query('SELECT * FROM productos ORDER BY id')
    res.status(200).json({
      ok: true,
      total: productos.length,
      data: productos
    })
  }catch(e){
    console.error(e)
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor'
    })
  }
}


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

