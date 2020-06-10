const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const BookingSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  strict: true,
  timestamps: true,
});

module.exports = mongoose.model('Booking', BookingSchema);
