const users=require('../Models/userSchema');
const technicians=require('../Models/technicianSchema')
//importing jsonwebtoken
const jwt=require('jsonwebtoken');
const addedService = require('../Models/adminAddServiceSchema');
exports.registerAPI = async (req, res) => {
    console.log("Inside the register API");
  
    const { username, email, password } = req.body;
    const existingUser = await users.findOne({ email });
  
    if (existingUser) {
      res.status(402).json({ message: "User Already Existing..." });
    } else {
      const newUser = new users({
        username: username,
        email: email,
        password: password,
        github: "",
        linkedIn: "",
        profilePic: "",
      });
  
      await newUser.save();
      res.status(200).json("Registration successful...");
    }
  };
  //login logic
  exports.loginAPI = async (req, res) => {
    console.log("Inside the login API");
  
    const {email, password } = req.body;
   try{
    const existingUser = await users.findOne({ email,password });
  
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
exports.getAllTechnicians = async (req, res) => {
  const searchKey = req.query.search; // Get search term from query parameters
  const locationFilter = req.query.location; // Get location filter from query parameters

  console.log(searchKey, locationFilter);

  // Build query object dynamically
  const query = {};

  if (searchKey) {
    query.brand = {
      $regex: searchKey,
      $options: "i", // Case-insensitive search
    };
  }

  if (locationFilter) {
    query.location = {
      $regex: locationFilter,
      $options: "i", // Case-insensitive search for location
    };
  }

  try {
    const response = await technicians.find(query); // Apply the query to fetch technicians

    // Map the response to only include required fields
    const allTechnicians = response.map(({ username, email, location, _id }) => ({
      username,
      email,
      location,
      _id,
    }));

    res.status(200).json(allTechnicians); // Send the filtered technicians list
  } catch (error) {
    res.status(406).json(error); // Handle errors
  }
};

//get service added by admin 
exports.getAllAdminAddedServicesAPI=async(req,res)=>{
  try{
    const response=await addedService.find()
    res.status(200).json(response)
  
  }
catch(err){
  res.status(406).json(err)
}
}