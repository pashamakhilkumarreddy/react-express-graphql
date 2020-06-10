/*
  eslint-disable no-underscore-dangle
 */
const {
  User,
  Event,
} = require('../models');

const convertDateToString = (date) => new Date(date).toISOString();

const transformEvent = (event) => ({
  ...event._doc,
  date: convertDateToString(event._doc.date),
  creator: getUser(event.creator), // eslint-disable-line no-use-before-define
});

const transformBooking = (booking) => ({
  ...booking.doc,
  user: getUser(booking._doc.user), // eslint-disable-line no-use-before-define
  event: getEventDetails(booking._doc.event), // eslint-disable-line no-use-before-define
  createdAt: convertDateToString(booking._doc.createdAt),
  updatedAt: convertDateToString(booking._doc.updatedAt),
});

async function getEvents(eventIds) {
  try {
    const events = await Event.find({
      _id: {
        $in: eventIds,
      },
    });
    return events.map((event) => (transformEvent(event)));
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getUser(userID) {
  try {
    const user = await User.findById(userID);
    return {
      ...user._doc,
      createdEvents: getEvents(user._doc.createdEvents),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getEventDetails(eventId) {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  convertDateToString,
  transformEvent,
  transformBooking,
  getEvents,
  getUser,
  getEventDetails,
};
