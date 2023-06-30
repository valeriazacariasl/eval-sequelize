const express = require('express');
const router = express.Router();

const {mostrarRegister, processRegister} = require('../controllers/registerController');
// Ruta para mostrar el formulario de registro
router.get('/', mostrarRegister);

// Ruta para registrar un nuevo usuario
router.post('/', processRegister);

module.exports = router;
