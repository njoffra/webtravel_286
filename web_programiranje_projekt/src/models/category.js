const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    max: 255
  },
}, { timestamps: true }
)

module.exports = mongoose.model('Category', categorySchema)