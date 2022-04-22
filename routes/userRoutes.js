const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users-list', userController.findUsers);
router.post('/create-user', userController.createUser);
router.get('/find-user/:id', userController.findUser);
router.delete('/delete-user/:id', userController.deleteUser);
router.patch('/update-user/:id', userController.updateUser);

module.exports = router;
