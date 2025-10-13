const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userID :{
        type : String,
        required : true
    },
    roleID :{
        type : Number,
        required : true
    }
})

module.exports = mongoose.model("user_validate",UserSchema);