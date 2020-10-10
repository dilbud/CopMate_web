const express = require('express');

const loginController = require('../controller/loginController');
const signupController = require('../controller/signupController');

const userRouter = express.Router();

userRouter.post('/login', loginController);
userRouter.post('/signup', signupController);

module.exports = userRouter;
