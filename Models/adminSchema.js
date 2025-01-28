const mongoose=require('mongoose')
//schema creation
const adminSchema=new mongoose.Schema({
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
    }
})

//Model Creation
const admin=mongoose.model('admin',adminSchema)
module.exports=admin;