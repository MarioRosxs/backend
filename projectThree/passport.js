const passport = require('passport');
const models = require("./models");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  const personas = await models.Persona.findAll();

  console.log(jwt_payload.nombre);
  console.log(jwt_payload.email);

  const foundPersona = personas.find(persona => jwt_payload.email === persona.email);

  if (foundPersona) {
    console.log("Autentificado");
    return done(null, foundPersona);
  } else {
    return done(null, false, { message: 'Usuario no encontrado' });
  }
}));


module.exports = passport;
