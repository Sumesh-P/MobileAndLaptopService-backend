const technicians=require('../Models/technicianSchema');
const selectedservices=require('../Models/addServiceSchema')
const jwt=require('jsonwebtoken')
exports.technicianRegisterAPI = async (req, res) => {
    console.log("Inside the register API");
  
    const { username, email, password,address,mobileNumber,location,domain,brand} = req.body;
    const existingUser = await technicians.findOne({ email });
  
    if (existingUser) {
      res.status(402).json({ message: "User Already Existing..." });
    } else {
      const newTechnician = new technicians({
        username: username,
        email: email,
        password: password,
        address:address,
        location:location,
        domain:domain,
        brand:brand,
        mobileNumber:mobileNumber

      });
  
      await newTechnician.save();
      res.status(200).json("Register successful...");
    }
  };
  //login logic
  exports.technicianLoginAPI = async (req, res) => {
    console.log("Inside the login API");
  
    const {email, password } = req.body;
    try{
      const existingUser = await technicians.findOne({ email,password });
    
      if (existingUser) {
        const token=jwt.sign({userId:existingUser._id},process.env.jwtKey)
        console.log(token)
        res.status(200).json({currentUser:existingUser,token:token});
      } else {
        res.status(404).json("Invalid emailId or password")
      }
     }
     catch(error){
      res.status(401).json(error)
     }
    };
//Get
exports.getServices=async(req,res)=>{
  try{
    const currentUser_id=req.headers['current_tech_id'];
    const response = await selectedservices.find({ tech_id: currentUser_id });
    const allTechnicians =response.map(({ fullName,mobileNumber,address,deviceBrand,model,date,_id,techResponse,status,payment}) => ({ fullName,mobileNumber,address,deviceBrand,model,date,_id,techResponse: techResponse || "" ,payment:payment || "",status})); 
    res.status(200).json(allTechnicians);
  }
  catch(error){
    res.status(406).json(error)
  }
}
//Get
exports.getTechnicianResponse=async(req,res)=>{
  const id=req.payload
  try{
    console.log(id)
    const response = await selectedservices.find({userId:id});
    console.log(response)
    // const result = {
    //   fullName: response.fullName,
    //   mobileNumber: response.mobileNumber,
    //   deviceBrand: response.deviceBrand,
    //   model: response.model,
    //   date: response.date,
    //   _id: response._id,
    //   techResponse: response.techResponse,
    // };
    // console.log(result)
    res.status(200).json(response);
  }
  catch(error){
    res.status(406).json(error)
  }
}
//get technician for Admin
exports.getTechniciansForAdmin=async(req,res)=>{
  try{
    const response=await technicians.find()
    res.status(200).json(response)
  }
  catch(error){
    res.status(406).json(error)
  }
}
//Admin delete Technician
exports.deleteTechnicianAPI = async (req, res) => {
  console.log("Inside technician delete API");

  const { technicianId } = req.params;
  console.log(technicianId);

  try {
    const technician = await technicians.findByIdAndDelete(technicianId); 
    res.status(200).json(technician);
  } catch (err) {
    res.status(406).json(err);
  }
};