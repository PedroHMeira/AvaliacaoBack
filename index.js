import express from "express";
import bancoDeDados from "./repository/index.js";


const app = express();


app.use(express.json());


app.post("/api/tarefa", (req, res) => {
   const { id, descricao, data } = req.body
   if (!id || !descricao || !data) {
       res.status(400).send({ message: "Favor informar id, descricao e data" })
       return
   }
   bancoDeDados.push({ id, descricao, data, concluido: false })
   res.status(201).send({ message: "Tarefa criada com sucesso" })
})


app.get("/api/tarefa", (req, res) => {
   const concluido = req.query.concluido
   if (concluido == "false") {
       const tarefas = bancoDeDados.filter(it => it.concluido == false)
       res.status(200).send({ message: "Tarefas não concluídas", tarefas })
       return
   }
   res.status(200).send({ message: "Tarefas encontradas com sucesso", tarefas: bancoDeDados })
})


app.get("/api/tarefa/:id", (req, res) => {
   const id = req.params.id
   const tarefa = bancoDeDados.find(it => it.id == id)
   if (!tarefa) {
       res.status(404).send({ message: "Tarefa não encontrada!" })
       return
   }
   res.status(200).send({ message: "Tarefa encontrada com sucesso!", tarefa })
})


app.put("/api/tarefa/:id", (req, res) => {
   const id = req.params.id
   const { descricao, data } = req.body
   const tarefa = bancoDeDados.find(it => it.id == id)
   if (!tarefa) {
       res.status(404).send({ message: "Tarefa não encontrada" })
       return
   }
   if (!descricao || !data) {
       res.status(400).send({ message: "Favor informar descricao e data" })
       return
   }
   tarefa.descricao = descricao
   tarefa.data = data
   res.status(200).send({ message: "Tarefa alterada com sucesso", tarefa })
})


app.put("/api/tarefa/:id/concluir", (req, res) => {
   const id = req.params.id
   const tarefa = bancoDeDados.find(it => it.id == id)
   if (!tarefa) {
       res.status(404).send({ message: "Tarefa não encontrada" })
       return
   }
   tarefa.concluido = !tarefa.concluido
   res.status(200).send({ message: "Concluído alterado com sucesso", tarefa })
})


app.delete("/api/tarefa/:id", (req, res) => {
   const id = req.params.id
   const index = bancoDeDados.findIndex(it => it.id == id)
   if (index === -1) {
       return res.status(404).send({
           message: "Tarefa não encontrada"
       })
   }
   bancoDeDados.splice(index, 1)
   res.status(200).send({
       message: "Tarefa deletada com sucesso"
   })
})
// bele, seu feedback sera feito junto com os demais - pode comitar enviar o link e ser feliz

app.listen(3000, () => {
   console.log("Servidor rodando na porta 3000");
});