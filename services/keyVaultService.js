const { DefaultAzureCredential }
    = require("@azure/identity");

const { SecretClient }
    = require("@azure/keyvault-secrets");


const credential = new DefaultAzureCredential();

const keyVaultUrl = process.env.KEY_VAULT_URL;

const client = new SecretClient(
    keyVaultUrl,
    credential
);


async function obterSecret(nome) {

    const secret = await client.getSecret(nome);

    return secret.value;
}


module.exports = {
    obterSecret
};