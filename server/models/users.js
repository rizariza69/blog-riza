const mongoose = require('mongoose')

const userSchema =  mongoose.Schema({
    username: String,
    email : {
        type: String,
        unique: true
    },
    password: String,  
},
{
    timestamps: true
})

const Users = mongoose.model("User", userSchema)

module.exports = Users