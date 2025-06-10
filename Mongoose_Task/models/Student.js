const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required']
  },
  age: {
    type: Number,
    min: 3,
    max: 100
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model('Student', studentSchema);
