const express = require('express');
const router = express.Router();
const personaController = require('../controladores/personaController');
const passport = require("passport");



router.get('/', passport.authenticate('jwt', { session: false }),  personaController.getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }),  personaController.getById);
router.post('/', passport.authenticate('jwt', { session: false }), personaController.add);
router.delete('/:id', passport.authenticate('jwt', { session: false }), personaController.eliminar);
router.put('/:id', passport.authenticate('jwt', { session: false }), personaController.editar);

module.exports = router;
