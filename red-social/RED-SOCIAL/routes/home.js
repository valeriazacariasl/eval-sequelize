var express = require('express');
var router = express.Router();
const multer = require('multer');
var path = require('path'); //importo los modulos que voy a necesitar

const storage = multer.diskStorage({ //
    destination: function (req, file, cb) {
      cb(null, 'public/images/posteos');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  

const { mostrarhome, sendForm, postFromUser, deletePostUser, updatePostUser, showEditView} = require('../controllers/homeController');

//defino las rutas

router.get('/', mostrarhome);

router.post('/', upload.single('image'), sendForm) //se encarga de CREAR una publicación

router.get('/post', postFromUser) 

//delete
router.delete('/post/delete/:id', deletePostUser)

//UPDATE
router.put('/post/edit/:id', updatePostUser);

router.get('/post/edit/:id', showEditView)



module.exports = router;
