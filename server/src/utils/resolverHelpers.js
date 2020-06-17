/*
  eslint-disable no-underscore-dangle, no-use-before-define
 */
const DataLoader = require('dataloader');

const {
  User,
  Event,
} = require('../models');

const eventLoader = new DataLoader((eventIds) => getEvents(eventIds));

const userLoader = new DataLoader((userIds) => User.find({
  _id: {
    $in: userIds,
  },
}));

const convertDateToString = (date) => new Date(date).toISOString();

async function getEvents(eventIds) {
  try {
    const events = await Event.find({
      _id: {
        $in: eventIds,
      },
    });
    return events.map((event) => transformEvent(event));
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getEventDetails(eventId) {
  try {
    const event = await eventLoader.load(eventId.toString());
    return transformEvent(event);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getUser(userID) {
  try {
    const user = await userLoader.load(userID.toString());
    return {
      ...user._doc,
      createdEvents: eventLoader.load(user._doc.createdEvents),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const transformEvent = (event) => ({
  ...event._doc,
  date: convertDateToString(event._doc.date),
  creator: getUser(event._doc.creator),
});

const transformBooking = (booking) => ({
  ...booking._doc,
  user: getUser(booking._doc.user),
  event: getEventDetails(booking._doc.event),
  createdAt: convertDateToString(booking._doc.createdAt),
  updatedAt: convertDateToString(booking._doc.updatedAt),
});

module.exports = {
  convertDateToString,
  transformEvent,
  transformBooking,
  getEvents,
  getUser,
  getEventDetails,
};
