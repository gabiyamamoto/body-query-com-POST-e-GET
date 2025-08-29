// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/dados.js";
const { bruxos } = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

// Query Parameters no Node.js - API de Hogwarts
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;

    if (casa) {
        resultado = resultado.filter(b => b.casa.toLowerCase().includes(casa.toLocaleLowerCase()));
    }

    if (ano) {
        resultado = resultado.filter(b => b.ano == ano);
    }

    if (especialidade) {
        resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }

    if (nome) {
        resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
});

//Body -  Adicionar ou editar o bruxo, ele é o corpo da requisição
app.post("/bruxos", (req, res) => {
    const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } = req.body;

    console.log('Dados recebidos: req.body');

    if (!nome || !casa || !ano || !vivo) {
        return res.status(400).json({
            suscess: false,
            message: "Nome, casa, ano e estar vivo são obrigatórios para um bruxo!"
        });
    }

    //Criar um novo bruxo
    const novoBruxo = {
        id: bruxos.length + 1,
        nome: nome,
        casa: casa,
        ano: parseInt(ano),
        varinha: varinha || "Ainda não adquirido",
        mascote: mascote || "Ainda não adquirido",
        patrono: patrono || "Ainda não descoberto",
        especialidade: especialidade || "Ainda não realizado",
        vivo: vivo
    }

    bruxos.push(novoBruxo);

    res.status(201).json({
        sucess: true,
        message: "Novo bruo adicionado a Hogwarts!",
        data: novoBruxo
    });
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});