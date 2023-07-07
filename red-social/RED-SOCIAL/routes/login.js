var express = require('express');
var router = express.Router();

const { mostrarInicio, processLogin, cerrarSesion } = require('../controllers/loginController.js')

/* GET home page. */
router.get('/', mostrarInicio);

//procesa los datos de la sesión
router.post('/', processLogin)

router.get('/logout', cerrarSesion)


module.exports = router;
