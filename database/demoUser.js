const mongoose = require('mongoose');

try {
    mongoose.connect("mongodb://127.0.0.1:27017/appUsers", { useNewUrlParser: true , useUnifiedTopology: true});

} catch (error) {
    console.log(error)
}


const demoUserSchema = new mongoose.Schema({
    email : { type : "String" , required : true, unique: true},
    fullName : { type : "String" , required : true},
    password : { type : "String" , required : true}
})

const demoUser = mongoose.model('demoUser', demoUserSchema)

module.exports = {demoUser}