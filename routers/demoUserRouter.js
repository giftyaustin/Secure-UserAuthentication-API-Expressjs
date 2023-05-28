const express = require('express');
const demoUserRouter = express.Router();
const {getDashboard} = require('../userController/demoUserController.js')

demoUserRouter.post('/', getDashboard)

module.exports = {demoUserRouter}