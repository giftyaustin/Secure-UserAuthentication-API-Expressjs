const { demoUser } = require("../database/demoUser.js");
const {generateToken} = require('./loginController.js')
require("dotenv").config();
const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");
const salt = Number(process.env.SALT_ROUNDS);



//  ============ signing up user [demo]================

const demoSignup = async (req, res)=>{
    const {email, fullName, password} = req.body;
    const tryingUser = await demoUser.find({email:email})
   
    if(!tryingUser.length){
        const hash = await bcrypt.hash(password, salt);
        if (hash) {
          const newdemoUser = new demoUser({
            email: email,
            fullName: fullName,
            password: hash
          });
          newdemoUser.save().then((pushedUser) => {
            if (pushedUser) {
              userData = {email:email}
              const accessToken = generateToken(userData, "15m");
              const refreshToken = generateToken(userData, '1d');
              res.status(200).json({
                message: "Account created successfully",
                accessToken:accessToken,
                refreshToken: refreshToken,
                authorized: true,
              });
            }
          });
        }
        
    }
    else{
        res.status(400).json({message:"user exists", authorized:false})
    }


}


const demoLogin = async (req, res)=>{
  const {email, password} = req.body;
  const tryingUser = await demoUser.find({email:email}) 
  console.log(tryingUser)
  if(tryingUser){
      const response = await bcrypt.compare(password,tryingUser[0].password)
      if(response){
          const userData = {email:email}
          const accessToken = generateToken(userData, "15m");
          const refreshToken = generateToken(userData, '1d');
          
          res.json({accessToken:accessToken, refreshToken: refreshToken, authorized:true})
      }
      else{
        res.status(400).json({message:"email or password incorrect", authorized:false})
      }
  }
  else{
      res.status(400).json({message: "user not found", authorized:false})
  }
}






module.exports = { demoSignup , demoLogin};
