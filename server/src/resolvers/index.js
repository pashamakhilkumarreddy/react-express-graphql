const authResolvers = require('./auth');
const bookingsResolvers = require('./bookings');
const eventsResolvers = require('./events');

module.exports = {
  ...authResolvers,
  ...bookingsResolvers,
  ...eventsResolvers,
};
