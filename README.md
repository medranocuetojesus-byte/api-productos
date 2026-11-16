# API Productos – Tienda Perú

API REST desarrollada con **Node.js**, **Express** y **MySQL** para administrar la información de una tienda. Permite realizar operaciones CRUD (listar, obtener, crear, actualizar y eliminar) sobre tres módulos: **productos**, **clientes** y **proveedores**.

## Tecnologías

- Node.js
- Express 5
- MySQL (mysql2 con `pool` de conexiones)
- dotenv (variables de entorno)
- nodemon (desarrollo)
- Postman (pruebas)

## Estructura del proyecto

```
api-productos/
├── database/
│   └── db.sql                    # Script de la BD "tiendaperu" (3 tablas + datos de prueba)
├── src/
│   ├── config/
│   │   ├── env.js                # Lee las variables del archivo .env
│   │   └── database.js           # Conexión a MySQL (pool)
│   ├── controllers/              # Lógica de cada módulo
│   │   ├── producto.controller.js
│   │   ├── cliente.controller.js
│   │   └── proveedor.controller.js
│   ├── routes/                   # Rutas (URL + verbo HTTP)
│   │   ├── index.js              # Reúne todas las rutas
│   │   ├── producto.routes.js
│   │   ├── cliente.routes.js
│   │   └── proveedor.routes.js
│   ├── app.js                    # Configuración de Express
│   └── server.js                 # Punto de entrada: conecta a MySQL y levanta el servidor
├── .gitignore
├── package.json
└── README.md
```

## Base de datos

Base de datos: **tiendaperu**

| Tabla | Campos |
|---|---|
| `productos` | id, marca, descripcion, precio, stock, create_at, update_at |
| `clientes` | id, apellidos, nombres, telefono, direccion, email, create_at, updated_at |
| `proveedores` | id, razonsocial, contacto, ruc, direccion, create_at, updated_at |

El script `database/db.sql` crea la base de datos, las tablas y 3 registros de prueba en cada una. Ejecútalo en MySQL Workbench antes de iniciar la API.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/medranocuetojesus-byte/api-productos.git
   cd api-productos
   ```

2. Instalar las dependencias (esto reconstruye la carpeta `node_modules`):

   ```bash
   npm install
   ```

3. Ejecutar el script `database/db.sql` en MySQL Workbench.

4. Crear manualmente el archivo `.env` en la raíz del proyecto:

   ```env
   # Servidor
   PORT=3000

   # Base de datos MySQL
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=tiendaperu
   DB_CONNECTION_LIMIT=10
   ```

5. Iniciar el servidor:

   ```bash
   npm run dev     # con nodemon (se reinicia al guardar cambios)
   npm start       # modo normal
   ```

   Si todo está bien verás: `Conexion a MySQL exitosa` y `Servidor iniciado en http://localhost:3000`.

> El `.env` y `node_modules` no se suben a GitHub (están en `.gitignore`).

## Endpoints

Base URL: `http://localhost:3000/api`

### Productos – `/api/productos`

| Método | URL | Descripción |
|---|---|---|
| GET | `/api/productos` | Listar todos los productos |
| GET | `/api/productos/:id` | Obtener un producto por ID |
| POST | `/api/productos` | Crear un producto |

### Clientes – `/api/clientes`

| Método | URL | Descripción |
|---|---|---|
| GET | `/api/clientes` | Listar todos los clientes |
| GET | `/api/clientes/:id` | Obtener un cliente por ID |
| POST | `/api/clientes` | Crear un cliente |
| PUT | `/api/clientes/:id` | Actualizar un cliente |
| DELETE | `/api/clientes/:id` | Eliminar un cliente |

Ejemplo de cuerpo (JSON) para crear o actualizar:

```json
{
  "apellidos": "Pérez Gómez",
  "nombres": "Ana Lucía",
  "telefono": "955123456",
  "direccion": "Av. Libertad 100, Chincha",
  "email": "ana.perez@gmail.com"
}
```

### Proveedores – `/api/proveedores`

| Método | URL | Descripción |
|---|---|---|
| GET | `/api/proveedores` | Listar todos los proveedores |
| GET | `/api/proveedores/:id` | Obtener un proveedor por ID |
| POST | `/api/proveedores` | Crear un proveedor |
| PUT | `/api/proveedores/:id` | Actualizar un proveedor |
| DELETE | `/api/proveedores/:id` | Eliminar un proveedor |

Ejemplo de cuerpo (JSON) para crear o actualizar:

```json
{
  "razonsocial": "Comercial Lima S.A.C.",
  "contacto": "Pedro Salas",
  "ruc": "20456789012",
  "direccion": "Jr. Junín 250, Lima"
}
```

## Respuestas de la API

| Código | Cuándo ocurre |
|---|---|
| 200 | Consulta, actualización o eliminación correcta |
| 201 | Registro creado |
| 400 | Datos inválidos o ID incorrecto |
| 404 | El registro no existe |
| 409 | Email (clientes) o RUC (proveedores) duplicado |
| 500 | Error interno del servidor |

## Validaciones principales

- **Clientes:** apellidos, nombres y dirección obligatorios; teléfono de 9 dígitos; email con formato válido y único.
- **Proveedores:** razón social, contacto y dirección obligatorios; RUC de 11 dígitos y único.
