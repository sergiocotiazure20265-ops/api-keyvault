const OpenAI = require("openai");

const {
    obterSecret
} = require("./keyVaultService");


async function perguntarOpenAI(pergunta) {

    // Buscando a chave da OpenAI
    // diretamente no Azure Key Vault
    const apiKey =
        await obterSecret("OpenAI-ApiKey");


    // Criando o cliente da OpenAI
    const openai =
        new OpenAI({
            apiKey: apiKey
        });


    // Enviando a pergunta
    const response =
        await openai.responses.create({

            model:
                process.env.OPENAI_MODEL
                || "gpt-6-luna",

            input: pergunta
        });


    return response.output_text;
}


module.exports = {
    perguntarOpenAI
};