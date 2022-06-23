const sequelize = require('sequelize')

const connection = new sequelize('perguntas', 'root', 'Vitor2309', {
    host: 'localhost',
    dialect: 'mysql'
})


connection.sync({force : false});

module.exports = connection