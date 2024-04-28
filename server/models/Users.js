const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
    },
    age : {
        type: Number,
    },
    email : {
        type: String,
    },
    password : {
        type : String,
    }


})

const UserModel = mongoose.model("users",UserSchema)

module.exports = UserModel