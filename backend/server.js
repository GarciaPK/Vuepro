// backend/server.js
const express = require('express');
const mysql = require('mysql2/promise'); // Usar la versión promise de mysql2 para trabajar con promesas
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'proyecto',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


// Ruta para obtener todas las tareas de la BD
app.get('/tareas', async (req, res) => {
  try {
    // Obtener todas las tareas desde la base de datos
    const [rows] = await pool.execute('SELECT * FROM tareas');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para obtener tareas paginadas
app.get('/tareas', async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const [rows] = await pool.execute('SELECT * FROM tareas LIMIT ?, ?', [offset, pageSize]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para agregar un nueva tarea
app.post('/new-tarea', async (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  try {
    await pool.execute(
      'INSERT INTO tareas (nombre, descripcion, estado) VALUES (?, ?, ?)',
      [nombre, descripcion, estado]
    );
    res.status(201).json({ message: 'Tarea agregadoa correctamente' });
  } catch (error) {
    console.error('Error al agregar tarea:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para eliminar una tarea por su ID
app.delete('/delete-tareas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM tareas WHERE id = ?', [id]);
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para buscar usuarios por nombre
app.get('/search', async (req, res) => {
  const { nombre } = req.query;
  try {
    // Buscar usuarios por nombre en la base de datos
    const [rows] = await pool.execute('SELECT * FROM tareas WHERE nombre LIKE ?', [`%${nombre}%`]);
    res.json(rows);
  } catch (error) {
    console.error('Error al buscar usuarios por nombre:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//ADMINISTRADOR

// Rutas
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT users.usu_idagente, users.usu_login, cargousuarios.cau_codcargo AS role ' +
      'FROM users ' +
      'JOIN cargousuarios ON users.cau_codcargo = cargousuarios.cau_codcargo ' +
      'WHERE users.usu_login = ? AND users.usu_passwd = ?',
      [username, password]
    );

    if (rows.length > 0) {
      res.json({ role: rows[0].role });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/users', async (req, res) => {
  try {
    // Obtener todas las tareas desde la base de datos
    const [rows] = await pool.execute('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

//VISUALIZAR PERAQAAAAAAAAAAAAAA  
app.get('/view-user/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const [user] = await pool.query('SELECT * FROM users WHERE usu_idagente = ?', [id]);
      if (user.length > 0) {
          res.json(user[0]);
      } else {
          res.status(404).send('Usuario no encontrado');
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el usuario');
  }
});

// Ruta para actualizar un usuario por su ID

app.put('/update-user:usu_idagente', async (req, res) => {
  
  const { usu_idagente } = req.params;
 
  try {
    const [result] = await pool.execute(
      `UPDATE users SET ? WHERE usu_idagente = ?`,
      [req.body,usu_idagente]
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'Usuario actualizado correctamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
      
    }
  } catch (error) {
    console.log(result);
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});


// Ruta para obtener tareas paginadas
app.get('/users', async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const [rows] = await pool.execute('SELECT * FROM users LIMIT ?, ?', [offset, pageSize]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para agregar un nueva tarea
app.post('/new-user', async (req, res) => {
  const { documento, nombre, estado, passwd, login, cod_cargo, login_new, login_temp } = req.body;
  try {
    await pool.execute(  //falta aun reestructurar 
      'INSERT INTO users (usu_documento, usu_nombre, usu_estado, usu_passwd, usu_login, cau_codcargo, usu_login_new, usu_logintemp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [documento, nombre, estado, passwd, login, cod_cargo, login_new, login_temp]
    );
    res.status(201).json({ message: 'Tarea agregadoa correctamente' });
  } catch (error) {
    console.error('Error al agregar tarea:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


app.delete('/delete-user/:usu_idagente', async (req, res) => {
  const { usu_idagente } = req.params;

  // Verificar que el id sea un número entero válido
  if (!Number.isInteger(parseInt(usu_idagente))) {
    return res.status(400).json({ message: 'El ID de usuario proporcionado no es válido' });
  }

  try {
    await pool.execute('DELETE FROM users WHERE usu_idagente = ?', [usu_idagente]);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para buscar usuarios por nombre
app.get('/search-user', async (req, res) => {
  const { nombre } = req.query;
  try {
    // Buscar usuarios por nombre en la base de datos
    const [rows] = await pool.execute('SELECT * FROM users WHERE usu_nombre LIKE ?', [`%${nombre}%`]);
    res.json(rows);
  } catch (error) {
    console.error('Error al buscar usuarios por nombre:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});

