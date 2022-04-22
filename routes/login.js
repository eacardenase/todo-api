const express = require('express');

const router = express.Router();
const createMongoDBClient = require('../database/db');

router.post('/create-user', (req, res) => {
    const client = createMongoDBClient();
    const { user } = req.body;

    if (!user) {
        res.status(400).json({
            message: 'Error, there is no user information to store.',
        });
    }

    client.connect((err) => {
        const collection = client.db('TODO').collection('users');

        if (err) {
            res.status(500).json({
                message: 'There was a problem connecting with the database.',
            });
        }

        collection.insertOne(user);

        res.status(200).json({
            message: 'User stored successfully.',
        });
    });

    client.close();
});

router.get('/find-user/:id', (req, res) => {
    const client = createMongoDBClient();
    const { id: userID } = req.params;

    client.connect(async (err) => {
        const collection = client.db('TODO').collection('users');

        if (err) {
            res.status(500).json({
                message: 'There was a problem connecting with the database.',
            });
        }

        const user = await collection.findOne({ id: +userID });

        if (!user) {
            res.json({
                message: 'Error.',
                description: 'User does not exists.',
            });
        } else {
            res.status(200).json({
                message: 'Success',
                data: user,
            });
        }
    });

    client.close();
});

router.delete('/find-user/:id', (req, res) => {
    const client = createMongoDBClient();
    const { id: userID } = req.params;

    client.connect(async (err) => {
        const collection = client.db('TODO').collection('users');

        if (err) {
            res.status(500).json({
                message: 'There was a problem connecting with the database.',
            });
        }

        await collection.deleteOne({ id: +userID });

        res.status(200).json({
            message: 'User deleted successfully.',
        });
    });

    client.close();
});

module.exports = router;
