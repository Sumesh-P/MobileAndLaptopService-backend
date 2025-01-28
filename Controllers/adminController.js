const selectedService = require('../Models/addServiceSchema');
const addedService=require('../Models/adminAddServiceSchema');
const admin = require('../Models/adminSchema');
const contacts=require('../Models/contactSchema')
const jwt=require('jsonwebtoken')
exports.adminAddServiceAPI = async (req, res) => {
    try {
        console.log("Inside the admin add service API");

        const {brand,model,service,price} = req.body;
        if (
            ! brand ||
            ! model ||
            ! service ||
            ! price
        ) {
            return res.status(404).json("Details not fully filled");
        }

        const existingService = await addedService.findOne({ model,service });
        if (existingService) {
            return res.status(402).json({ message: "Service Already Existing..." });
        }

        const newService = new addedService({brand,model,service,price
            
        });

        await newService.save();
        res.status(200).json("Details Updated successfully...");
    } catch (error) {
        console.error("Error in adminAddServiceAPI:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
//admin login
exports.adminLoginAPI = async (req, res) => {
    console.log("Inside the admin login API");
  
    const {email, password } = req.body;
    console.log(email),
    console.log(password)
   try{
    const existingUser = await admin.findOne({ email,password });
  console.log(existingUser)
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
 //Admin Get Technicians
//  exports.getAllTechnicians = async (req, res) => {
//     const searchKey = req.query.search; // Get search term from query parameters
//     const locationFilter = req.query.location; // Get location filter from query parameters
  
//     console.log(searchKey, locationFilter);
  
//     // Build query object dynamically
//     const query = {};
  
//     if (searchKey) {
//       query.brand = {
//         $regex: searchKey,
//         $options: "i", // Case-insensitive search
//       };
//     }
  
//     if (locationFilter) {
//       query.location = {
//         $regex: locationFilter,
//         $options: "i", // Case-insensitive search for location
//       };
//     }
  
//     try {
//       const response = await technicians.find(query); // Apply the query to fetch technicians
  
//       // Map the response to only include required fields
//       const allTechnicians = response.map(({ username, email, location, _id }) => ({
//         username,
//         email,
//         location,
//         _id,
//       }));
  
//       res.status(200).json(allTechnicians); // Send the filtered technicians list
//     } catch (error) {
//       res.status(406).json(error); // Handle errors
//     }
//   }; 
 
//get services added
exports.getAllAdminAddedServiceAPI=async(req,res)=>{
  try{
    const response=await addedService.find()
    res.status(200).json(response)
  
  }
catch(err){
  res.status(406).json(err)
}
}
//add message
exports.addMessageAPI = async (req, res) => {
  try {
      console.log("Inside the  add Message API");

      const {name,email,subject,message} = req.body;
      if (
          ! name ||
          ! email ||
          ! subject ||
          ! message
      ) {
          return res.status(404).json("Details not fully filled");
      }
      const newMessage = new contacts({name,email,subject,message
          
      });

      await newMessage.save();
      res.status(200).json("Details Updated successfully...");
  } catch (error) {
      console.error("Error in Sending message:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
  }
};
//get messages
exports.getAllMessagesAPI=async(req,res)=>{
  try{
    const response=await contacts.find()
    res.status(200).json(response)
  
  }
catch(err){
  res.status(406).json(err)
}
}
//delete messages
exports.deleteMessageAPI = async (req, res) => {
  console.log("Inside Message delete API");

  const { messageId } = req.params;
  console.log(messageId);

  try {
    const message = await contacts.findByIdAndDelete(messageId); 
    res.status(200).json(message);
  } catch (err) {
    res.status(406).json(err);
  }
};
//delete service
exports.deleteAdminAddedServiceAPI = async (req, res) => {
  console.log("Inside Service delete API");

  const { serviceId } = req.params;
  console.log(serviceId);

  try {
    const service = await addedService.findByIdAndDelete(serviceId); 
    res.status(200).json(service);
  } catch (err) {
    res.status(406).json(err);
  }
};