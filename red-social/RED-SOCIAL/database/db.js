const {Sequelize} = require ('sequelize')

const db = new Sequelize ('red_social', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = db