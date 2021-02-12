const moment = require('moment');
const axios = require('axios');
const conexao = require('../infra/database/conexao');
const repositorio = require('../repositorios/atendimento');

class Atendimento {
    adiciona(atendimento) {
        const dataCriacao = moment('2021-02-03').format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length

        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros))
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            return repositorio.adiciona(atendimentoDatado)
                .then((resultados) => {
                    const id = resultados.insertId
                    return ({ ...atendimento, id })
                })
        }
    }

    lista(response) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                response.status(400).json(erro);
            } else {
                response.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, response) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0];
            const cpf = atendimento.cliente
            if (erro) {
                response.status(400).json(erro);
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data
                response.status(200).json(atendimento);
            }
        });
    }

    altera(id, valores, response) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                response.status(400).json(erro);
            } else {
                response.status(200).json({ ...valores, id });
            }
        });
    }

    delete(id, response) {
        const sql = 'DELETE FROM Atendimentos WHERE id =?';

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                response.status(400).json(erro);
            } else {
                response.status(200).json({ id });
            }
        });
    }
};

module.exports = new Atendimento;