const express = require('express')
const req = require('express/lib/request')
const mongoose = require('mongoose')
const Usuario = require('./model/Usuario')
const bodyParser = require('body-parser')
const app = express()
// mid
app.use(express.json())
app.use(bodyParser.json())
// rotas
app.get('/',(req,res)=>{
    res.send('olá, mundo')
})
    // cadastrar Usuário
app.post('/registro',async(req,res)=>{
    const  {email ,nome ,senha} = req.body

    const novoUsuario = new Usuario({
        email,
        nome,
        senha
    })

    try {
        await novoUsuario.save()
        res.json({msg:'usuário cadastrado com sucesso'})
    } catch (error) {
        console.log(error)
        res.json({msg:'aconteceu um erro no servidor tente novamente mais tarde'})
    }
})
// alterar usuário
app.patch('/alterar/:id/',async(req,res)=>{
    try {
        const id = req.params.id
        const {email, nome, senha} = req.body
        const alterarUsuario = await Usuario.findByIdAndUpdate(id,{email:email,nome:nome,senha:senha
            
        },{new:true})

        if(!alterarUsuario){
            res.json({msg:'usuário não encontrado'})
        }
            res.json({msg:'usuário alterado com sucesso'})
    } catch (error) {
        console.log(error)
        res.json({msg:'aconteceu um erro no servidor tente novamente mais tarde'})

    }
})

// deletar usuário

app.delete('/deletar/:id/',async(req,res)=>{
    try {
        const id = req.params.id
        await Usuario.findByIdAndDelete(id)
        res.json({msg:'usuário deletado com sucesso'})
    
    } catch (error) {
     console.log(error)
     res.json({msg:'aconteceu um erro no servidor tente novamente mais tarde'})

    }
})
// listar usuários

app.get('/usuarios',async (req,res)=>{
    try {
        const usuarios = await Usuario.find()
        if(!usuarios){
            res.json({msg:'nenhum usuaário encontrado'})
        }
        res.json(usuarios)
    } catch (error) {
        console.log(error)
        res.json({msg:'houve  um erro no servidor ao procurar pelo usuário'})
    }
})

// conexão com banco
mongoose.connect(`mongodb+srv://ericsantos:OSvKRUKcgyD2nWrc@cluster0.cekjod9.mongodb.net/?retryWrites=true&w=majority`,{})
.then(()=>{
    console.log('conectado com o banco')
}).catch((error)=>{
    console.log('erro ao se conectar  ao banco',error)
})
app.listen(5000,()=>{
    console.log('servidor rodando')
})

