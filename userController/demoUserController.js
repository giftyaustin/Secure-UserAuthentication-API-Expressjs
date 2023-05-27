const jwt = require('jsonwebtoken')
require('dotenv').config();
const {generateToken} = require('../authController/loginController.js')


const getDashboard = async(req, res)=>{
    const {refreshToken, accessToken} = req.body
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        
        if(decoded){
            res.status(200).json({message: "you can view your dashboard", authorized:true})
        }
    } catch (error) {
        if(error.name==="TokenExpiredError"){

            try {
                const rdecoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY)
            
                const userData = {username : rdecoded.username, password : rdecoded.password}
                const newAccessToken = generateToken(userData, "15m");
                res.status(200).json({message: "new access token issued, session continues",accessToken:newAccessToken,authorized:true })
            } catch (error) {
                if(error.name==="TokenExpiredError"){
                    res.json({message: "session expired. Login into your account", authorized:false})
                }
                else{
                    res.status(400).json(error)
                }
            }

           
        }
        
        else{
            res.status(400).send(error)
        }
    }
   
    // const user = await User.find({username:username})
}

module.exports = {getDashboard}