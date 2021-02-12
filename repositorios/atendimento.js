const query = require('../infra/database/queries');

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?'
        return query(sql, atendimento)
    }

    lista() {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        return query(sql);
    }
}

module.exports = new Atendimento();