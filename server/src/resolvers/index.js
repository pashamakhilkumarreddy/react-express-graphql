/*
  eslint-disable no-underscore-dangle
 */
const bcrypt = require('bcryptjs');
const {
  Event,
  User,
} = require('../models');

async function getEvents(eventIds) {
  try {
    const events = await Event.find({
      _id: {
        $in: eventIds,
      },
    });
    return events.map((event) => ({
      ...event._doc,
      date: new Date(event._doc.date).toISOString(),
      creator: getUser(event.creator), // eslint-disable-line no-use-before-define
    }));
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

module.exports = {
  async events() {
    const events = await Event.find({});
    return events.map((event) => ({
      ...event._doc,
      date: new Date(event._doc.date).toISOString(),
      creator: getUser(event._doc.creator),
    }));
  },
  async createEvent(args) {
    try {
      const {
        title,
        description,
        price,
        date,
      } = args.eventInput;
      const event = new Event({
        title,
        description,
        price,
        date: new Date(date),
        creator: '5ede620d10983b64ab99db8c',
      });
      const result = await event.save();
      if (result) {
        User.findById('5ede620d10983b64ab99db8c').then(async (user) => {
          if (user) {
            user.createdEvents.push(result);
            await user.save();
          } else {
            throw new Error('User not Found!');
          }
        });

        return {
          ...result._doc,
          date: new Date(result._doc.date).toISOString(),
          creator: getUser(result._doc.creator),
        };
      }
      return null;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  async createUser(args) {
    try {
      const {
        email,
        password,
      } = args.userInput;
      const userExists = await User.findOne({
        email,
      });
      if (!userExists) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          email,
          password: hashedPassword,
        });
        const result = await user.save();
        return {
          ...result._doc,
          password: null,
        };
      }
      throw new Error('User already exists with the given email address');
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
