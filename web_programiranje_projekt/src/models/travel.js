const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema
const travelSchema = mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true
  }
 
} ,  { timestamps: true });

module.exports = mongoose.model('Travel', travelSchema);
