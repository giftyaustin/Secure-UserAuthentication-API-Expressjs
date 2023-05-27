const mongoose = require('mongoose');
try {
    mongoose.connect("mongodb://127.0.0.1:27017/appUsers", { useNewUrlParser: true , useUnifiedTopology: true});

} catch (error) {
    console.log(error)
}
const otpSchema = mongoose.Schema({
    
    email : {type: String, required: true, unique: true},
    otp : {type: Number, required: true},
})


const Otp = mongoose.model("Otp", otpSchema)

module.exports = {Otp}