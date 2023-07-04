const db = require('../database/db.js');
const bcrypt = require('bcrypt');

let registerController = {
  mostrarRegister: function (req, res) {
    res.render('register');
  },
  processRegister: async function (req, res) {
    const { email, username, name, lastname, password } = req.body;
    console.log(req.body);

    // Verificar si algún campo está vacío
    if (!email || !username || !name || !lastname || !password) {
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

    try {
      // Verificar si el correo electrónico ya está registrado
      db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error en el registro');
        } else {
          if (results.length > 0) {
            // El correo electrónico ya está registrado
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
            bcrypt.hash(password, 8, (error, hash) => {
              if (error) {
                console.log(error);
                res.status(500).send('Error en el registro');
              } else {
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
                        alertTitle: 'Registration',
                        alertMessage: 'Registro exitoso',
                        alertIcon: 'success',
                        showConfirmButton: 1500,
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
    } catch (error) {
      console.log(error);
      res.status(500).send('Error en el registro');
    }
  }
};


module.exports = registerController;