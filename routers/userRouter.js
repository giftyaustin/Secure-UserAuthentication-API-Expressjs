const express = require('express');
const userRouter = express.Router();
const {getDashboard} = require('../userController/userController.js')

userRouter.get('/', getDashboard)

module.exports = {userRouter}