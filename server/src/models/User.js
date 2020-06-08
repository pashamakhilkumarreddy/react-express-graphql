const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    min: 1,
    max: 100,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 50,
    trim: true,
  },
  createdEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event',
  }],
}, {
  strict: true,
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
