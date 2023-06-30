const db = require('../database/db.js');
const bcrypt = require('bcrypt');
let session = require ('express-session');
const cookieParser = require('cookie-parser');

let loginController = {
    mostrarInicio: function (req, res) {
        if (req.session.loggedIn) {
            res.render('home', {
                loggedIn: true,
                name: req.session.name
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
              const match = await bcrypt.compare(password, results[0].password);
              if (match) {
                req.session.loggedIn = true;
                req.session.name = results[0].name;
    
                res.cookie('userCookie', email, { maxAge: 900000, httpOnly: true });
                console.log('Cookie establecida:', req.cookies.userCookie);

    
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
      },
    cerrarSesion:function (req, res) {
        req.session.destroy(()=>{
            res.redirect('/')
        })
    }
    //puedo hacer un crud con posteos del usuario, 

}


module.exports = loginController;