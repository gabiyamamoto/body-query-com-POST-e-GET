// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/dados.js";
const { bruxos, varinhas, pocoes, animais } = dados;

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

    if (!nome || !casa || !ano ) {
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
        message: "Novo bruxo adicionado a Hogwarts!",
        data: novoBruxo
    });
});

//Query parameters - Varinhas
app.get('/varinhas', (req, res) => {
    const { material, nucleo } = req.query;
    let resultado = varinhas;

    if (material) {
        resultado = resultado.filter(v => v.material.toLowerCase().includes(material.toLocaleLowerCase()));
    }

    if (nucleo) {
        resultado = resultado.filter(v => v.nucleo.toLowerCase().includes(nucleo.toLocaleLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
});

//Body - Varinhas
app.post("/varinhas", (req, res) => {
    const { material, nucleo, comprimento } = req.body;

    console.log('Dados recebidos: req.body');

    if (!material || !nucleo || !comprimento ) {
        return res.status(400).json({
            suscess: false,
            message: "Material, nucleo e comprimento são obrigatórios para uma varinha!"
        });
    }

    if (comprimento <= 0) {
        return res.status(400).json({
            suscess: false,
            message: "O comprimento da varinha é inválido!"
        });
    }

    //Criar uma nova varinha
    const novaVarinha = {
        id: varinhas.length + 1,
        material: material,
        nucleo: nucleo,
        comprimento: comprimento
    }

    varinhas.push(novaVarinha);

    res.status(201).json({
        sucess: true,
        message: "Nova varinha adicionada a Hogwarts!",
        data: novaVarinha
    });
});

//Query parameters - Poções
app.get('/pocoes', (req, res) => {
    const { nome, efeito } = req.query;
    let resultado = pocoes;

    if (nome) {
        resultado = resultado.filter(p => p.nome.toLowerCase().includes(nome.toLocaleLowerCase()));
    }

    if (efeito) {
        resultado = resultado.filter(p => p.efeito.toLowerCase().includes(efeito.toLocaleLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
});

//Query parameters - Animais
app.get('/animais', (req, res) => {
    const { tipo, nome } = req.query;
    let resultado = animais;

    if (tipo) {
        resultado = resultado.filter(a => a.tipo.toLowerCase().includes(tipo.toLocaleLowerCase()));
    }

    if (nome) {
        resultado = resultado.filter(a => a.nome.toLowerCase().includes(nome.toLocaleLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
});

app.get("/stats", (req, res) => {
    const contagem = {};
    const soma = {};

    for (let i = 0; i < bruxos.length; i++) {
        const bruxo = bruxos[i];
        const casa = bruxo.casa;

        if (contagem[casa]) {
            contagem[casa]++;
        } else {
            contagem[casa] = 1;
        }
    }

    for (let i = 0; i < varinhas.length; i++) {
        const varinha = varinhas[i];
        const material = varinha.material;

        if (soma[material]) {
            soma[material]++;
        } else {
            soma[material] = 1;
        }
    }

    let materialMaisComum = 

    res.status(200).json(contagem);
});



// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});