const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv').config();

const uri = process.env.DB_CONNECTION;

function createMongoDBClient() {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    });

    return client;
}

module.exports = createMongoDBClient;
