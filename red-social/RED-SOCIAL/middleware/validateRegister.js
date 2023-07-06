const { body, validationResult } = require('express-validator');

const validateRegister = [
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('username').matches('^[0-9a-zA-Z ]+$').withMessage('Debe contener letras minúsculas, mayúsculas y números'),
    body('name').matches('^[A-Za-záéíóúÁÉÍÓÚñÑüÜ ]+$').withMessage('Solo debe contener letras y espacios'),
    body('lastname').matches('^[A-Za-záéíóúÁÉÍÓÚñÑüÜ ]+$').withMessage('Solo debe contener letras y espacios'),
    body('password')
      .isLength({ min: 8, max: 21 }).withMessage('Debe tener mínimo 8 caracteres y máximo 21')
      .isStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
      .withMessage('La contraseña debe tener mínimo una mayúscula, una minúscula, un número y un carácter especial'),
  ];
  

module.exports = validateRegister;
