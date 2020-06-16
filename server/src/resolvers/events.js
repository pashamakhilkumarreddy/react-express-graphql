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
      const { userId } = req;
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
        creator: userId,
      });
      const result = await event.save();
      if (result) {
        const creator = await User.findById(userId);
        if (!creator) {
          throw new Error('User not Found!');
        }
        creator.createdEvents.push(result);
        await creator.save();
        return transformEvent(result);
      }
      return null;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
