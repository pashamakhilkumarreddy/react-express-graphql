const {
  Event,
  User,
} = require('../models');
const {
  transformEvent,
} = require('../utils');

module.exports = {
  async events() {
    try {
      const events = await Event.find({});
      return events.map((event) => (transformEvent(event)));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  async createEvent(args, req) {
    try {
      if (!req.isAuth) {
        throw new Error('User is not authenticated');
      }
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
        return transformEvent(result);
      }
      return null;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
