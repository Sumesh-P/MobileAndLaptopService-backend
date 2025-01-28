const mongoose=require('mongoose')
//schema creation
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    fullname:{
        type:String
    },
    mobilenumber:{
        type:String
    },
    address:{
        type:String
    },
    devicebrand:{
        type:String
    },
    model:{
        type:String
    },
    selectedservice:{
        type:String
    },
    selecteddate:{
        type:String
    },
})

//Model Creation
const users=mongoose.model('users',userSchema)
module.exports=users;