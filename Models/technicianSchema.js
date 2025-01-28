const mongoose=require('mongoose')
const technicianSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    location:{
        type:String
    },
    domain:{
        type:String
    },
    brand:{
        type:String
    }
})

//Model Creation
const technicians=mongoose.model('technicians',technicianSchema)
module.exports=technicians;