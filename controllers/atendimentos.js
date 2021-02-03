module.exports = app => {
    app.get('/atendimentos', (request, response) => {
        response.send('Você está na rota de atendimentos.');
    });

    app.post('/atendimentos', (request, response) => {
        response.send('Você está na rota de criação de um atendimento.');
    });
};