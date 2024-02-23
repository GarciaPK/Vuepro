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

// Rutas
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT users.USU_IDAGENTE, users.USU_LOGIN, cargousuarios.CAU_CODCARGO AS role ' +
      'FROM users ' +
      'JOIN cargousuarios ON users.CAU_CODCARGO = cargousuarios.CAU_CODCARGO ' +
      'WHERE users.USU_LOGIN = ? AND users.USU_PASSWD = ?',
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

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});