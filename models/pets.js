const conexao = require('../database/conexao');

class Pet {
    adiciona(pet, response) {
        const query = 'INSERT INTO Pets SET ?'

        conexao.query(query, pet, erro => {
            if(erro) {
                console.log(erro)
                response.status(400).json(erro)
            } else {
                response.status(200).json(pet)
            }
        })
    }
}

module.exports = new Pet();