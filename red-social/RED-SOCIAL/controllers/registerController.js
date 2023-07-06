const db = require('../database/db.js');
const bcrypt = require('bcrypt');
let { validationResult } = require('express-validator');

let registerController = {
  mostrarRegister: function (req, res) {
    if (req.session.loggedIn) { //si el usuario inicio sesión me redirige a home sino me renderiza la vista register
      return res.redirect('/home');
    }
    res.render('register');
  },
  processRegister: async function (req, res) {

    //recibo los datos del form
    const { email, username, name, lastname, password, confirmPassword } = req.body; 
  
    // verifica si hay algún campo vacio
    if (!email || !username || !name || !lastname || !password || !confirmPassword) {
      res.render('register', {
        alert: true,
        alertTitle: 'Error',
        alertMessage: 'Todos los campos deben estar completos',
        alertIcon: 'error',
        showConfirmButton: true,
        timer: 1500,
        ruta: ''
      });
      return;
    }
  
    const resultsValidation = validationResult(req); //almaceno la validación de los campos del form
  
    if (!resultsValidation.isEmpty()) {
      const errors = resultsValidation.array();
      return res.render('register', { errors, email, username, name, lastname });
    }

    if (password !== confirmPassword) { //si las contraseñas no coinciden error
      res.render('register', {
        alert: true,
        alertTitle: 'Error',
        alertMessage: 'Las contraseñas no coinciden',
        alertIcon: 'error',
        showConfirmButton: true,
        timer: 1500,
        ruta: ''
      });
      return;
    }
  
    try {
      // verifica si el email ya está registrado
      db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error en el registro');
        } else {
          if (results.length > 0) {
            res.render('register', {
              alert: true,
              alertTitle: 'Error',
              alertMessage: 'El correo electrónico ya está registrado',
              alertIcon: 'error',
              showConfirmButton: true,
              timer: 1500,
              ruta: ''
            });
          } else {
            // verific si el nombre de usuario ya está registrado
            db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
              if (error) {
                console.log(error);
                res.status(500).send('Error en el registro');
              } else {
                if (results.length > 0) {
                  res.render('register', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'El nombre de usuario ya está registrado',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: ''
                  });
                } else { //si ninguno esta registrado genero un hash de la contraseña ingresada
                  bcrypt.hash(password, 8, (error, hash) => {
                    if (error) {
                      console.log(error);
                      res.status(500).send('Error en el registro');
                    } else { //si el hash se genera correctamente se hace la inserción del usuario
                      db.query(
                        'INSERT INTO users (email, username, name, lastname, password) VALUES (?, ?, ?, ?, ?)',
                        [email, username, name, lastname, hash],
                        (error, results) => {
                          if (error) {
                            console.log(error);
                            res.status(500).send('Error en el registro');
                          } else {
                            res.render('register', {
                              alert: true,
                              alertTitle: 'Registro exitoso',
                              alertMessage: 'Registro exitoso, puede iniciar sesión',
                              alertIcon: 'success',
                              showConfirmButton: true,
                              timer: 1500,
                              ruta: ''
                            });
                          }
                        }
                      );
                    }
                  });
                }
              }
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error en el registro');
    }
  }  
};


module.exports = registerController;