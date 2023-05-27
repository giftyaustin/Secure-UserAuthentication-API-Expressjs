const express = require('express');
const signupRouter = express.Router();
const loginRouter = express.Router();
const demoSignupRouter = express.Router()
const {checkSignup,checkSignupOtp } = require('../authController/signupController.js');
const {loginUser} = require("../authController/loginController.js");
const {demoSignup} = require("../authController/demoAuthController.js");
const {demoLogin} = require("../authController/demoAuthController.js");


// ========= secure signing up ==========

signupRouter.post('/signup', checkSignup)
signupRouter.post('/signup/:otp', checkSignupOtp)

loginRouter.post('/login', loginUser)

// ======== demo signing up =============

demoSignupRouter.post('/signup', demoSignup)
demoSignupRouter.post('/login', demoLogin)




module.exports = {signupRouter, loginRouter, demoSignupRouter};