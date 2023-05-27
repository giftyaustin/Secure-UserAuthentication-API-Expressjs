const {User} = require('../database/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateToken =  (userData, time)=>{
    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {expiresIn: time})
    return(token)
}

const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    const tryingUser = await User.find({email:email}) 
    if(tryingUser.length){
        const response = await bcrypt.compare(password,tryingUser[0].password)
        if(response){
            const userData = {email:email}
            const accessToken = generateToken(userData, "15m");
            const refreshToken = generateToken(userData, '1d');
            
            res.json({accessToken:accessToken, refreshToken: refreshToken, authorized:true})
        }
    }
    else{
        res.json({message: "user not found"})
    }
    
}

module.exports = {loginUser,generateToken}