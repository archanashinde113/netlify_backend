
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  Reason:{
    type: String,
    required: true,
  },
  Type:{
    type: String,
    required: true,
  },
  Division:{
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Priority:{
    type: String,
    required: true,
  },
  Department:{
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  Location:{
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Registered', 'Close', 'Running', 'Cancel'], default: 'Registered' 
  },
});

module.exports = mongoose.model('Project', projectSchema);
