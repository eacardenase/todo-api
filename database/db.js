const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.DB_CONNECTION;

async function createMongoDBClient() {
    const client = await MongoClient.connect(uri);

    return client;
}

module.exports = createMongoDBClient;
