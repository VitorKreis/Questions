const Sequelize = require('sequelize')
const connection = require('./database')

const resposta = connection.define('resposta', {
    respota: {
        type: Sequelize.TEXT,
        allownNull: false
    },
    perguntaid: {
        type: Sequelize.INTEGER,
        allownNull: false
    }
});


resposta.sync({force: false})


module.exports = resposta