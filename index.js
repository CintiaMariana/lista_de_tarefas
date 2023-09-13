const express = require("express")

const porta = 3000

let tarefas_db = [
    {
        nome: "Tarefa 1",
        descricao: "Descrição da Tarefa 1",
        status: "A FAZER",
        id: 1
    },

    {
        nome: "Tarefa 2",
        descricao: "Descrição da Tarefa 2",
        status: "FAZENDO",
        id: 2
    },

    {
        nome: "Tarefa 3",
        descricao: "Descrição da Tarefa 3",
        status: "FEITO",
        id: 3
    }
]

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("API executando...")
})

app.get("/tarefas/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get("/tarefas/:id", (req, res) => {
    const id = req.params.id

    const tarefas_filtradas = tarefas_db.filter(tarefa => {
        return tarefa.id == id
    })

    if (tarefas_filtradas.length == 0){
        return res.status(404).send()
    }

    const tarefa = tarefas_filtradas[0]

    res.send({
        nome: tarefa.nome,
        descricao: tarefa.descricao,
        status: tarefa.status,
        id: tarefa.id
    })
})

app.post("/tarefas", (req, res) => {
    const ultimo_id = tarefas_db.reduce((anterior, proximo) => {
        if(proximo.id > anterior){
            return proximo.id
        } else {
            return anterior
        }
    }, 0)

    const tarefa_nova = req.body
    const erros = []

    if(!tarefa_nova.nome || tarefa_nova.nome == ""){
        erros.push("Campo nome não pode ser vazio")
    }

    if(erros.length > 0){
        return res.status(400).send(erros)
    }

    tarefa_nova.id = ultimo_id + 1

    tarefas_db.push(tarefa_nova)

    res.send(tarefa_nova)
})



app.listen(porta, (err) => {
    if(err){
        console.log("Erro ao subir aplicação")
    } else {
        console.log(`Aplicação executando na porta ${porta}`)
    }
})