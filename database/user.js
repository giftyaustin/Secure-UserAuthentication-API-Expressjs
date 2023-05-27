const mongoose = require('mongoose');

try {
    mongoose.connect("mongodb://127.0.0.1:27017/appUsers", { useNewUrlParser: true , useUnifiedTopology: true});

} catch (error) {
    console.log(error)
}


const UserSchema = new mongoose.Schema({
    email : { type : "String" , required : true, unique: true},
    username : { type : "String" , required : true, unique: true},
    password : { type : "String" , required : true}
})

const User = mongoose.model('User', UserSchema)

module.exports = {User}