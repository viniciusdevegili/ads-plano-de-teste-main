const ServicoExercicio = require("../services/pessoa.js");

const servico = new ServicoExercicio()
class ControllerExercicio {

    async PegarUm(req, res){
      try {
        const id = req.params.id

        const result = await servico.PegarUm(id)
        
        res.status(200).json(result);
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message}); 
      }
    }

    async PegarTodos(_, res){
      try {
        const result = await servico.PegarTodos()

        res.status(201).json(result); 
      } catch (error) {
        res.status(500).json({ message: error.message});
      }
    }

    async Adicionar(req, res){
      try {
        const { pessoa } = req.body

        await servico.Adicionar(pessoa)
        
        res.status(201).json({ message: "Adicionado com sucesso!"});
      } catch (error) {
        if(error.parent.code === "ER_DUP_ENTRY") {
          res.status(500).json({ message: "Email já cadastrado!"});
        }
        res.status(500).json({ message: error.parent.message || error.message});
      }
    }

    async Alterar(req, res){
      try {
        const id = req.params.id
        const nome = req.body.nome
    
        await servico.Alterar(id, nome)
          
        res.status(200).json({ message: "Alterado com sucesso!"});
      } catch (error) {
        res.status(500).json({ message: error.errors.message || error.message});
        
      }
    }

    async Deletar(req, res){
      try {
        const id = req.params.id

        await servico.Deletar(id)
          
        res.status(200).json({ message: "Deletado com sucesso!"});
      } catch (error) {
        res.status(500).json({ message: error.message});
        
      }
    }

}

module.exports = ControllerExercicio