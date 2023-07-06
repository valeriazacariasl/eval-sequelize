const db = require('../database/db.js');
const bcrypt = require('bcrypt');
let session = require ('express-session');
const cookieParser = require('cookie-parser');

let loginController = {
    mostrarInicio: function (req, res) {
        if (req.session.loggedIn) { // si el usuario inicio sesión se renderiza la vista home sino login
            res.render('home', {
            }); 
        } else {
            res.render('login');
        }
    },
    processLogin: async function (req, res) {
      const { email, password } = req.body;
    
      if (email && password) { //verifica que estan los dos
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
          if (results.length === 0) { //si no se encontro email ni password error
            res.render('login', {
              alert: true,
              alertTitle: 'Error',
              alertMessage: 'Email y/o password incorrectos',
              alertIcon: 'error',
              showConfirmButton: true,
              timer: 1500,
              ruta: ''
            });
          } else {
            const match = await bcrypt.compare(password, results[0].password); //comparo las contraseñas
            if (match) { //si coinciden establezco las variables de sesión
              req.session.loggedIn = true;
              req.session.email = results[0].email;
              req.session.userId = results[0].id;
              req.session.name = results[0].name;
              req.session.lastname = results[0].lastname;
              req.session.username = results[0].username;
    
              console.log(req.session.userId);
    
              res.redirect('/home');
            } else { //sino coincide la contraseña que ingreso el usuario con el de la bbdd error
              res.render('login', {
                alert: true,
                alertTitle: 'Error!',
                alertMessage: 'Email y/o password incorrectos',
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: ''
              });
            }
          }
        });
      } else { //sino error
        res.render('login', {
          alert: true,
          alertTitle: 'Advertencia!',
          alertMessage: 'Ingrese un correo electrónico y contraseña válidos',
          alertIcon: 'warning',
          showConfirmButton: true,
          timer: 1500,
          ruta: ''
        });
      }
    }
    ,
    cerrarSesion:function (req, res) {
        req.session.destroy(()=>{
            res.redirect('/')
        })
    }
}


module.exports = loginController;