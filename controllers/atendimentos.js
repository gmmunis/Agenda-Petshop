const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (request, response) => {
        Atendimento.lista()
        .then(resultados => response.json(resultados))
        .catch(erros => response.status(400).json(resultados))
    });

    app.get('/atendimentos/:id', (request, response) => {
        const id = parseInt(request.params.id);

        Atendimento.buscaPorId(id, response);
    });

    app.post('/atendimentos', (request, response) => {
        const atendimento = request.body;

        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => response.status(201).json(atendimentoCadastrado)
            )
            .catch(erros => response.status(400).json(erros))
    });

    app.patch('/atendimentos/:id', (request, response) => {
        const id = parseInt(request.params.id);
        const valores = request.body;

        Atendimento.altera(id, valores, response);
    });

    app.delete('/atendimentos/:id', (request, response) => {
        const id = parseInt(request.params.id);

        Atendimento.delete(id, response);
    });
};