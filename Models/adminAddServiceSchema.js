const mongoose=require('mongoose')
//schema creation
const adminAddServiceSchema=new mongoose.Schema({
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
   
})

//Model Creation
const addedService=mongoose.model('adminaddedservices',adminAddServiceSchema)
module.exports=addedService;