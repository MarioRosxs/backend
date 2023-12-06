const cors = require('cors');
const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const jwt = require('jsonwebtoken');
const personaRouter = require('./routes/personasRoutes');
const donadorRouter = require('./routes/donadorRoutes');
const proyectoRouter = require('./routes/proyectoRoutes');
const passport = require('./passport');
const token = require('./generarToken');



// Configuración de CORS
app.use(cors({
  origin: 'https://localhost:3000', // Cambia esto con la URL de tu aplicación cliente
  credentials: true,
}));



// Otras configuraciones y rutas
app.use(express.json());
app.use(passport.initialize());
app.use('/personas', personaRouter);
app.use('/donador', donadorRouter);
app.use('/proyecto', proyectoRouter);

process.env.PORT = 3001;

const llavePrivada = fs.readFileSync('private.key');
const certificado = fs.readFileSync('certificate.crt');
const credenciales = {
  key: llavePrivada,
  cert: certificado,
  passphrase: 'Maya1862',
};

const httpsServer = https.createServer(credenciales, app);

httpsServer.listen(process.env.PORT, () => {
  console.log('Servidor https escuchando por el puerto:', process.env.PORT);
}).on('error', (err) => {
  console.log('Error al iniciar servidor:', err);
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Correo no proporcionado' });
  }

  console.log('Correo electrónico recibido en el servidor:', email);

  token.generarToken(email)
    .then(tokenGenerado => {
      // Imprime el token en la consola
      console.log('Token generado:', tokenGenerado);

      // Puedes utilizar el token de alguna manera en tu aplicación
      // Por ejemplo, almacenarlo en el estado de un componente en un frontend de Vue.js
      // o enviarlo en las solicitudes a tu backend, dependiendo de tus necesidades.

      // Envía el token al cliente
      res.json({ token: tokenGenerado });
    })
    .catch(error => {
      // Maneja cualquier error que pueda ocurrir durante la generación del token
      console.error('Error al generar el token:', error.message);

      // Devuelve un código de estado 500 y un mensaje de error al cliente
      res.status(500).json({ error: 'Error interno del servidor' });
    });
});
