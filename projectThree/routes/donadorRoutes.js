const express = require('express');
const router = express.Router();
const donadorController = require('../controladores/donadorController'); // Asegúrate de importar el controlador adecuadamente
const passport = require("passport");

router.get('/',passport.authenticate('jwt',{session:false}), donadorController.getAll);
router.get('/:id',passport.authenticate('jwt',{session:false}), donadorController.getById);
router.post('/',passport.authenticate('jwt',{session:false}), donadorController.add);
router.delete('/:id',passport.authenticate('jwt',{session:false}), donadorController.eliminar);
router.put('/:id',passport.authenticate('jwt',{session:false}), donadorController.editar);

module.exports = router;
