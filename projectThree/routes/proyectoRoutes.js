const express = require('express');
const router = express.Router();
const proyectoController = require('../controladores/proyectoController'); // Asegúrate de importar el controlador adecuadamente
const passport = require("passport");

router.get('/',passport.authenticate('jwt',{session:false}), proyectoController.getAll);
router.get('/:id',passport.authenticate('jwt',{session:false}), proyectoController.getById);
router.post('/',passport.authenticate('jwt',{session:false}), proyectoController.add);
router.delete('/:id',passport.authenticate('jwt',{session:false}), proyectoController.eliminar);
router.put('/:id',passport.authenticate('jwt',{session:false}), proyectoController.editar);

module.exports = router;
