const express = require('express');

const app = express();

app.get('/atendimentos', (request, response) => {
    return response.send('Você está na rota de atendimentos.');
});

app.listen(3000, () => console.log('servidor rodando na porta 3000'));