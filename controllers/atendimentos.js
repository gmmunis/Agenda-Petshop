const atendimentos = require('../models/atendimentos');
const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (request, response) => {
        Atendimento.lista(response);
    });

    app.get('/atendimentos/:id', (request, response) => {
        const id = parseInt(request.params.id);

        Atendimento.buscaPorId(id, response);
    });

    app.post('/atendimentos', (request, response) => {
        const atendimento = request.body;

        Atendimento.adiciona(atendimento, response);
    });
};