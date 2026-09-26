const express = require("express");

const {
    obterSecret
} = require("./services/keyVaultService");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {

    res.json({
        mensagem: "API Node.js executando com sucesso.",
        ambiente: process.env.NODE_ENV || "local"
    });

});


app.get("/api/status", (req, res) => {

    res.json({
        status: "ONLINE",
        dataHora: new Date()
    });

});


app.get("/api/configuracao", async (req, res) => {

    try {

        const apiKey =
            await obterSecret("ApiKey");

        res.json({
            mensagem: "Secret consultado com sucesso.",
            configuracaoEncontrada:
                apiKey != null
        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            mensagem:
                "Não foi possível consultar o Key Vault.",
            erro:
                error.message
        });
    }
});


app.listen(PORT, () => {

    console.log(
        `Servidor executando na porta ${PORT}`
    );

});