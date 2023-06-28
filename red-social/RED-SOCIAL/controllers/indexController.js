let indexController = {
    mostrarIndex: function (req, res) {
        res.render('index');
    },
    processIndex: function (req, res) {

        const {

            username,
            email,
            password

        } = req.body

        console.log(req.body);

        if (username !== '') {
            console.log('hola')
        }
    }
}

module.exports = indexController