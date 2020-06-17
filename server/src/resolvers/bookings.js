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
    try {
      if (!req.isAuth) {
        throw new Error('User is not authenticated');
      }
      const bookings = await Booking.find({
        user: req.userId,
      });
      if (bookings) return bookings.map((booking) => transformBooking(booking));
      return [];
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  async bookEvent({
    eventId,
  }, req) {
    try {
      if (!req.isAuth) {
        throw new Error('User is not authenticated');
      }
      const event = await Event.findOne({
        _id: eventId,
      });
      const booking = new Booking({
        user: req.userId,
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
    try {
      if (!req.isAuth) {
        throw new Error('User is not authenticated');
      }
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
