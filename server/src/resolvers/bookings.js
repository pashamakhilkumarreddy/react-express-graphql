const {
  Event,
  Booking,
} = require('../models');

const {
  transformBooking,
  transformEvent,
} = require('../utils');

module.exports = {
  async bookings(args, req) {
    if (!req.isAuth) {
      throw new Error('User is not authenticated');
    }
    try {
      const bookings = await Booking.find({});
      return bookings.map((booking) => (transformBooking(booking)));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  async bookEvent({
    eventId,
  }, req) {
    if (!req.isAuth) {
      throw new Error('User is not authenticated');
    }
    try {
      const event = await Event.findOne({
        _id: eventId,
      });
      const booking = new Booking({
        user: '5ede620d10983b64ab99db8c',
        event,
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  async cancelBooking({
    bookingId,
  }, req) {
    if (!req.isAuth) {
      throw new Error('User is not authenticated');
    }
    try {
      const booking = await Booking.findById(bookingId).populate('event');
      if (booking) {
        const event = transformEvent(booking.event);
        await Booking.findByIdAndDelete(bookingId);
        return event;
      }
      throw new Error('Cannot find a booking with the given id!');
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
