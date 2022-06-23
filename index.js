const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database');
const pergunta = require('./Peguntas-DB');
const Resposta = require('./Respostas-DB');

const app = express();


// Config Exrpress
app.set('view engine', 'ejs')
app.use(express.static("public"))

// Config Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Confif DataBase Mysql
connection.authenticate().then(() => {
    console.log('Conexao com o banco de dados feita com sucesso!!');
}).catch((err) =>{
    console.log(err)
})




app.get('/', (req, res) => {
    pergunta.findAll({raw: true, order:[
        ["id", "DESC"]
    ]}).then(perguntas => {
        res.render("index", {
            Perguntas: perguntas
        })
    })
    
})

app.get('/perguntar', (req,res) => {
    res.render('perguntar')
})

app.post('/salve', (req, res) =>{
    
    var titulo = req.body.titulo
    var conteudo = req.body.conteudo
    pergunta.create({
        titulo: titulo,
        descricao: conteudo
    }).then(() =>{
        res.redirect('/')
    })
})



app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id
    pergunta.findOne({
        where: {id : id}
    }).then(pergunta => {
        if(pergunta != undefined){

            Resposta.findAll({
                where:{ perguntaID : pergunta.id },
                order: [["id", "DESC"]]
            }).then(respostas => {
                res.render('Pergunta', {
                pergunta : pergunta,
                respostas : respostas
            })

            })
        }else{  
            res.redirect('/')
        }
    })
})  


 app.post('/resposta', (req, res) =>{
     var corpo = req.body.corpo
     var perguntaID = req.body.IDpergunta
     Resposta.create({
         respota: corpo,
         perguntaid: perguntaID
     }).then(() =>{
        res.redirect('/pergunta/' + perguntaID)
    })
 })


 app.get('/contato', (req, res) =>{
     res.render('contato')
 })

//Conexao com a internet
app.listen('9000', (err) =>{
    if(err){
        console.log('Esta ocorrendo um erro: ' + err)
    }else{
        console.log('Esta rodando perfeitamente')
    }
})
