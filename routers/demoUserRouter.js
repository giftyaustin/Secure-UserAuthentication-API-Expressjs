const express = require('express');
const demoUserRouter = express.Router();
const {getDashboard} = require('../userController/demoUserController.js')

demoUserRouter.get('/', getDashboard)

module.exports = {demoUserRouter}