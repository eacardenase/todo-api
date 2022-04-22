const createMongoDBClient = require('../database/db');
class User {
    constructor(req) {
        this.user = req.body.user;
        this.req = req;
    }

    static async findUsers() {
        try {
            const client = await createMongoDBClient();
            const collection = client.db('TODO').collection('users');
            const rawData = await collection.find().toArray();

            const usersList = rawData.map((user) => {
                const { _id, id, firstName, lastName } = user;
                return {
                    _id,
                    id,
                    firstName,
                    lastName,
                };
            });

            client.close();

            return {
                error: false,
                data: usersList,
            };
        } catch (error) {
            return {
                error: true,
                description:
                    'There was a problem connecting with the database.',
            };
        }
    }

    async createUser() {
        if (!this.user) {
            return {
                error: true,
                description: 'Error, there is no user information to store.',
            };
        }

        try {
            const client = await createMongoDBClient();
            const collection = client.db('TODO').collection('users');
            collection.insertOne(this.user);

            // client.close();

            return {
                error: false,
                description: 'User stored successfully.',
            };
        } catch (error) {
            return {
                error: true,
                description:
                    'There was a problem connecting with the database.',
            };
        }
    }

    async findUser() {
        const client = await createMongoDBClient();
        const userID = +this.req.params.id;

        try {
            const collection = client.db('TODO').collection('users');

            const user = await collection.findOne({ id: userID });

            if (!user) {
                return {
                    error: true,
                    description: 'User does not exists.',
                };
            } else {
                client.close();

                return {
                    error: false,
                    description: 'User info successfully recovered.',
                    data: user,
                };
            }
        } catch (error) {
            console.log(error);
            return {
                error: true,
                description:
                    'There was a problem connecting with the database.',
            };
        }
    }

    async deleteUser() {
        const client = await createMongoDBClient();
        const userID = +this.req.params.id;

        try {
            const collection = client.db('TODO').collection('users');

            await collection.deleteOne({ id: userID });

            client.close();

            return {
                error: false,
                description: 'User deleted successfully.',
            };
        } catch (error) {
            return {
                error: true,
                description:
                    'There was a problem connecting with the database.',
            };
        }
    }

    async updateUser() {
        const client = await createMongoDBClient();

        const userID = +this.req.params.id;
        const userData = this.req.body;

        try {
            const collection = client.db('TODO').collection('users');

            await collection.updateOne(
                { id: userID },
                {
                    $set: userData,
                }
            );

            client.close();

            return {
                error: false,
                description: 'User updated successfully.',
            };
        } catch (error) {
            return {
                error: true,
                description:
                    'There was a problem connecting with the database.',
            };
        }
    }
}

module.exports = User;
