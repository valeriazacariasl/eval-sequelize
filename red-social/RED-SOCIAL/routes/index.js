var express = require('express');
const { mostrarIndex, processIndex } = require('../controllers/indexController');
var router = express.Router();

/* GET users listing. */

router.get('/', mostrarIndex);

router.post('/index', processIndex)

module.exports = router;
