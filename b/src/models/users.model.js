const {Schema, model } = require('mongoose')

const newSchema = new Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String, 
        require: true,
        unique : true
    },
    password:{
        type: String,
        require: true
    },
    isVerified:{
        type: String,
        require: false,
        default: "false"
    },
    role:{
        type: String,
        require: true,
        default: "user"
    }
}, {
    timestamps:true
})

const users = model("users", newSchema)
module.exports = users