var express = require('express');
var router = express.Router();

let loginController = require('../controllers/loginController.js')

/* GET home page. */
router.get('/', loginController.mostrarInicio);
// router.post('/', loginController.processLogin);

// router.post('/logout', loginController.logout);

module.exports = router;
