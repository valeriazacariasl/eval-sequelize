let registerController = {
  mostrarRegister: function (req, res) {
    res.render('register');
  },
  processRegister: function (req, res) {

    const {

      username,
      email,
      password

    } = req.body

    console.log(req.body);

    if (username !== '') {
      console.log('hola')
    }

    // const { username, email, password } = req.body;

    // try {
    //   const newUser = await User.create({
    //     username,
    //     email,
    //     password
    //   });

    //   res.render('register', { message: 'Te has registrado exitosamente' });
    // } catch (error) {
    //   console.log(error);
    //   // Manejo del error aquí
    // }
  }
};




module.exports = registerController;