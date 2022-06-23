const Sequelize = require('sequelize')
const connection = require('./database')


const pergunta = connection.define('Pergunta', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }

})

pergunta.sync({force: false})

module.exports = pergunta