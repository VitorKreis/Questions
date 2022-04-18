const sequelize = require('sequelize')

const connection = new sequelize('Perguntas', 'root', 'vitor2309', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection