const db = require('../database/db.js');
const bcrypt = require('bcrypt');
let session = require ('express-session');
const cookieParser = require('cookie-parser');

let loginController = {
    mostrarInicio: function (req, res) {
        if (req.session.loggedIn) {
            res.render('home', {
            }); 
        } else {
            res.render('login');
        }
    },
    processLogin: async function (req, res) {
      const { email, password } = req.body;
    
      if (email && password) {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
          if (results.length == 0) {
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
            req.session.loggedIn = true;
            req.session.email = results[0].email;
            req.session.userId = results[0].id;
            req.session.name = results[0].name;
            req.session.lastname = results[0].lastname;
            req.session.username = results[0].username;

            console.log(req.session.userId);
    
            const match = await bcrypt.compare(password, results[0].password);
            if (match) {
              res.redirect('/home');
            } else {
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
      } else {
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
    //puedo hacer un crud con posteos del usuario, 

}


module.exports = loginController;