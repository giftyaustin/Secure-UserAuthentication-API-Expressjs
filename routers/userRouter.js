const express = require('express');
const userRouter = express.Router();
const {getDashboard} = require('../userController/userController.js')

userRouter.post('/', getDashboard)

module.exports = {userRouter}