const mongoose = require('mongoose');

// schema creation
const addServiceSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  deviceBrand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  selectedType: {
    type: String,
    required: true
  },
  deviceImage: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: String
  },
  tech_id: {
    type: String
  },
  techResponse: {
    type: String
  },
  issue: {
    type: String
  },
  payment: {
    type: String
  },
  status: {
    type: String
  },
  // New field: Array of services with their cost
  bill: [
      {service: {
        type: String,
        required: true
      },
      cost: {
        type: Number,
        required: true
      }}
  ],
  totalCost:{
    type:Number
  }
});

// Model creation
const selectedService = mongoose.model('selectedService', addServiceSchema);
module.exports = selectedService;
