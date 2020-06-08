const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
    unique: true,
    min: 1,
    max: 100,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    min: 1,
    max: 100,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  strict: true,
});

module.exports = mongoose.model('Event', EventSchema);
