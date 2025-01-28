const selectedService = require("../Models/addServiceSchema");

exports.addServiceAPI = async (req, res) => {
    try {
        console.log("Inside the add service API");

        const { fullName, mobileNumber, address, deviceBrand, model, selectedType, date,tech_id,issue} = req.body;
        const deviceImage=req.file.filename
        const userId=req.payload
        if (
            !fullName || 
            !mobileNumber || 
            !address || 
            !deviceBrand || 
            !model || 
            !selectedType || 
            !deviceImage || 
            !date ||
            !issue
        ) {
            return res.status(404).json("Details not fully filled");
        }

        const existingUser = await selectedService.findOne({ mobileNumber });
        if (existingUser) {
            return res.status(402).json({ message: "User Already Existing..." });
        }

        const newService = new selectedService({
            fullName, mobileNumber, address, deviceBrand, model, selectedType, deviceImage, date, userId,tech_id,issue,techResponse:"",status:"initiated",payment:"",bill:[],totalCost:0
        });

        await newService.save();
        res.status(200).json("Details Updated successfully...");
    } catch (error) {
        console.error("Error in addServiceAPI:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


//Edit Service
exports.editServiceAPI = async (req, res) => {
    try {
        console.log("Inside the edit service API");
        const {serviceId,response} = req.body;
        const userId=req.payload

        const existingUser = await selectedService.findByIdAndUpdate({_id:serviceId},{techResponse:response});
        await selectedService.save();
        res.status(200).json("Details Updated successfully...");
    }
    catch (error) {
        console.error("Error in addServiceAPI:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
//delete Service API
exports.deleteServiceAPI=async(req,res)=>{
    console.log("Inside the delete API");
    const {serviceId}=req.params
    console.log(serviceId)
    try{
        const service=await selectedService.findByIdAndDelete({_id:serviceId})   
        res.status(200).json(service)
     }
     catch(err){
        console.log(err)
     }
}
//edit bill
exports.updateBillAPI = async (req, res) => {
    try {
      console.log("Inside the bill updation API");
      const { bill, totalCost,serviceId } = req.body;
      const userId = req.payload; // Assuming you need userId for other purposes
  
      // Update the document using findByIdAndUpdate
      const updatedService = await selectedService.findByIdAndUpdate(
        { _id: serviceId }, 
        { 
          $set: { 
            bill: bill,
            totalCost: totalCost 
          }
        }, 
        { new: true }  // This will return the updated document
      );
  
      // Check if the document was found and updated
      if (!updatedService) {
        return res.status(404).json({ message: "Service not found or failed to update." });
      }
  
      res.status(200).json({ message: "Details updated successfully", updatedService });
    } catch (error) {
      console.error("Error in updateBillAPI:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

  //get a particular service for payment
  exports.getParticularServiceAPI=async(req,res)=>{
    try{
      const serviceId=req.headers['serviceid'];
      console.log(serviceId)
      const response = await selectedService.find({ _id: serviceId });
      const details=response.map(({ fullName,mobileNumber,address,deviceBrand,model,date,_id,techResponse,status,payment,bill,totalCost}) => ({ fullName,mobileNumber,address,deviceBrand,model,date,_id,techResponse: techResponse || "" ,payment:payment || "",status,bill,totalCost})); 
      res.status(200).json(details);
    }
    catch(error){
      res.status(406).json(error)
    }
  }
  //edit payment
  exports.editPaymentAPI = async (req, res) => {
    try {
        console.log("Inside the edit payment API");
        const { serviceId, payment } = req.body;
        const userId = req.payload;

        // Update the service and return the updated document
        const updatedService = await selectedService.findByIdAndUpdate(
            { _id: serviceId },
            { payment: payment },
            { new: true } // Ensure the updated document is returned
        );

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found." });
        }

        res.status(200).json("Details updated successfully...");
    } catch (error) {
        console.error("Error in editPaymentAPI:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

  