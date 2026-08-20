const express = require('express');

const app = express();

const PORT = 3000;

function enderecoParaXml(endereco) {
    return `
        <endereco>
            <cep>${endereco.cep ?? ''}</cep>
            <logradouro>${endereco.logradouro ?? ''}</logradouro>
            <complemento>${endereco.complemento ?? ''}</complemento>
            <bairro>${endereco.bairro ?? ''}</bairro>
            <localidade>${endereco.localidade ?? ''}</localidade>
            <uf>${endereco.uf ?? ''}</uf>
        </endereco>
    `;
}

function erroParaXml(mensagem) {
    return `
        <erro>
            <mensagem>${mensagem}</mensagem>
        </erro>
    `;
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/cep/:numero', async (req, res) => {

    const cep = req.params.numero;

    if (!/^\d{8}$/.test(cep)) {
        return res.status(400).json({
            erro: 'CEP inválido. Informe 8 números, sem traço (ex: 83321000).'
        });
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const endereco = await resposta.json();

        if (endereco.erro) {
            return res.status(404).json({
                erro: 'CEP não encontrado'
            });
        }

        res.json(endereco);
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao consultar o ViaCEP'
        });
    }
});

// busca por uf/cidade/logradouro, ex: /endereco/PR/Pontal do Parana/Rua das Flores
app.get('/endereco/:uf/:cidade/:logradouro', async (req, res) => {

    const { uf, cidade, logradouro } = req.params;

    if (!/^[A-Za-z]{2}$/.test(uf) || cidade.length < 3 || logradouro.length < 3) {
        return res.status(400).json({
            erro: 'Informe uf (2 letras), cidade e logradouro (mínimo 3 caracteres cada).'
        });
    }

    try {
        const url = `https://viacep.com.br/ws/${uf}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/json/`;
        const resposta = await fetch(url);
        const enderecos = await resposta.json();

        if (!Array.isArray(enderecos) || enderecos.length === 0) {
            return res.status(404).json({
                erro: 'Endereço não encontrado'
            });
        }

        res.json(enderecos);
    } catch (erro) {
        res.status(500).json({
            erro: 'Erro ao consultar o ViaCEP'
        });
    }
});

// mesma coisa só que devolve em xml
app.get('/cep/:numero/xml', async (req, res) => {

    const cep = req.params.numero;

    res.type('application/xml');

    if (!/^\d{8}$/.test(cep)) {
        return res.status(400).send(erroParaXml('CEP inválido. Informe 8 números, sem traço.'));
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const endereco = await resposta.json();

        if (endereco.erro) {
            return res.status(404).send(erroParaXml('CEP não encontrado'));
        }

        res.send(enderecoParaXml(endereco));
    } catch (erro) {
        res.status(500).send(erroParaXml('Erro ao consultar o ViaCEP'));
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
