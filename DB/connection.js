//import mongoose
const mongoose=require('mongoose')
//importing connectionString from .env 
const connectionString=process.env.connectionString
//connection establishment with database
mongoose.connect(connectionString)
.then(res=>{
    console.log("pServer Connected to database")
})
.catch(error=>{
    console.log(error)
})