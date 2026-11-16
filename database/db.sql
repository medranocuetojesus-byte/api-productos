CREATE DATABASE tiendaperu;
USE tiendaperu;

CREATE TABLE IF NOT EXISTS productos
(
	id 			INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    marca		VARCHAR(100) 	NOT NULL,
    descripcion VARCHAR(200)	NOT NULL,
    precio		DECIMAL(10,2)	NOT NULL,
    stock 		INT UNSIGNED 	NOT NULL DEFAULT 0,
    create_at	DATETIME		NOT NULL DEFAULT NOW(),
    update_at	DATETIME		NULL
)ENGINE = INNODB;

INSERT INTO productos
    (marca, descripcion, precio, stock)
    VALUES
    ('Samsung', 'TV 55', 2500, 10),
    ('LG', 'Lavadora', 1200, 3),
    ('Sony', 'Playstation 5', 3200, 2);

SELECT * FROM productos;


-- ============================================================
-- NUEVAS TABLAS: clientes y proveedores
-- ============================================================

CREATE TABLE IF NOT EXISTS clientes
(
	id 			INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    apellidos	VARCHAR(100)	NOT NULL,
    nombres		VARCHAR(100)	NOT NULL,
    telefono	CHAR(9)			NOT NULL,
    direccion	VARCHAR(200)	NOT NULL,
    email		VARCHAR(120)	NOT NULL,
    create_at	DATETIME		NOT NULL DEFAULT NOW(),
    updated_at	DATETIME		NULL,
    CONSTRAINT uk_clientes_email UNIQUE (email)
)ENGINE = INNODB;

INSERT INTO clientes
    (apellidos, nombres, telefono, direccion, email)
    VALUES
    ('Quispe Huamán', 'Luis Alberto', '987654321', 'Av. Benavides 1234, Lima', 'luis.quispe@gmail.com'),
    ('Ramos Torres', 'María Fernanda', '912345678', 'Jr. Bolognesi 456, Chincha Alta', 'maria.ramos@gmail.com'),
    ('Castillo Rojas', 'Carlos Eduardo', '934567890', 'Calle Los Pinos 789, Ica', 'carlos.castillo@gmail.com');

SELECT * FROM clientes;


CREATE TABLE IF NOT EXISTS proveedores
(
	id 			INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    razonsocial	VARCHAR(150)	NOT NULL,
    contacto	VARCHAR(100)	NOT NULL,
    ruc			CHAR(11)		NOT NULL,
    direccion	VARCHAR(200)	NOT NULL,
    create_at	DATETIME		NOT NULL DEFAULT NOW(),
    updated_at	DATETIME		NULL,
    CONSTRAINT uk_proveedores_ruc UNIQUE (ruc)
)ENGINE = INNODB;

INSERT INTO proveedores
    (razonsocial, contacto, ruc, direccion)
    VALUES
    ('Distribuidora Andina S.A.C.', 'Jorge Mendoza', '20123456789', 'Av. Argentina 2500, Callao'),
    ('Importaciones Pacífico E.I.R.L.', 'Rosa Valdivia', '20234567890', 'Jr. Cusco 321, Lima'),
    ('Electro Sur S.R.L.', 'Miguel Paredes', '20345678901', 'Av. Grau 150, Chincha Alta');

SELECT * FROM proveedores;
