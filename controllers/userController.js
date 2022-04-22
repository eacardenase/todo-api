const UserModel = require('../models/User');

const findUsers = async (req, res) => {
    const requestData = await UserModel.findUsers();

    if (requestData.error) {
        return res.status(500).json({
            message: 'Error',
            description: requestData.description,
        });
    }

    res.status(200).json({
        message: 'Success',
        data: requestData.data,
    });
};

const createUser = async (req, res) => {
    const user = new UserModel(req);

    const response = await user.createUser();

    if (response.error) {
        return res.status(200).json({
            message: 'Error',
            description: response.description,
        });
    }

    res.status(200).json({
        message: 'Success',
        description: response.description,
    });
};

const findUser = async (req, res) => {
    const user = new UserModel(req);

    const response = await user.findUser();

    if (response.error) {
        return res.status(200).json({
            message: 'Error',
            description: response.description,
        });
    }

    res.status(200).json({
        message: 'Success',
        description: response.description,
        data: response.data,
    });
};

const deleteUser = async (req, res) => {
    const user = new UserModel(req);

    const response = await user.deleteUser();

    if (response.error) {
        return res.status(200).json({
            message: 'Error',
            description: response.description,
        });
    }

    res.status(200).json({
        message: 'Success',
        description: response.description,
    });
};

const updateUser = async (req, res) => {
    const user = new UserModel(req);

    const response = await user.updateUser();

    if (response.error) {
        res.status(200).json({
            message: 'Error',
            description: response.description,
        });
    }

    res.status(200).json({
        message: 'Success',
        description: response.description,
    });
};

module.exports = {
    findUsers,
    createUser,
    findUser,
    deleteUser,
    updateUser,
};
