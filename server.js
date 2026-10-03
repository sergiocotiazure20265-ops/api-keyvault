const express = require("express");

const {
    obterSecret
} = require("./services/keyVaultService");

const {
    perguntarOpenAI
} = require("./services/openAiService");


const app = express();

app.use(express.json());


const PORT =
    process.env.PORT || 3000;



// ==========================================
// Página inicial
// ==========================================

app.get("/", (req, res) => {

    res.json({
        mensagem:
            "API Node.js executando com sucesso (Aula Azure COTI).",

        ambiente:
            process.env.NODE_ENV || "local"
    });

});



// ==========================================
// Status da API
// ==========================================

app.get("/api/status", (req, res) => {

    res.json({

        status: "ONLINE",

        dataHora:
            new Date()

    });

});



// ==========================================
// Teste Azure Key Vault
// ==========================================

app.get("/api/configuracao", async (req, res) => {

    try {

        const apiKey =
            await obterSecret("ApiKey");


        res.json({

            mensagem:
                "Secret consultado com sucesso.",

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



// ==========================================
// OpenAI
// ==========================================

app.get("/api/ia", async (req, res) => {

    try {

        const pergunta =
            req.query.pergunta;


        if (!pergunta) {

            return res.status(400).json({

                mensagem:
                    "Informe uma pergunta."

            });
        }


        const resposta =
            await perguntarOpenAI(pergunta);


        res.json({

            pergunta: pergunta,

            resposta: resposta

        });

    }
    catch (error) {

        console.error(error);


        res.status(500).json({

            mensagem:
                "Não foi possível consultar a OpenAI.",

            erro:
                error.message

        });

    }

});



// ==========================================
// Inicialização
// ==========================================

app.listen(PORT, () => {

    console.log(
        `Servidor executando na porta ${PORT}`
    );

});