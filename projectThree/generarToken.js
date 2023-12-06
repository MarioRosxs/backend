const jwt = require('jsonwebtoken');
const { Persona } = require('./models');

const generarToken = async function(email) {
  try {
    // Verificar si el usuario existe en la base de datos
    const usuario = await Persona.findOne({ where: { email } });

    if (!usuario) {
      // Si el usuario no existe, puedes manejar el error de alguna manera
      console.log('Usuario no encontrado en la base de datos');
      const token = "SINACCESO";
      return token;
    }

    // La información que deseas incluir en el token
    const payload = {
      nombre: usuario.nombre,
      email: usuario.email,
      // Puedes incluir otros campos aquí según sea necesario
    };

    // Clave secreta para firmar el token
    const secretKey = 'secret';

    // Configuración del token (puedes incluir opciones adicionales según sea necesario)
    const options = {
      expiresIn: '15m', // Tiempo de expiración del token
    };

    // Generar el token
    const token = jwt.sign(payload, secretKey, options);

    // Imprimir el token generado
    console.log(token);

    return token;
  } catch (error) {
    console.error('Error al generar el token:', error);
    throw new Error('Error al generar el token');
  }
};

exports.generarToken = generarToken;
