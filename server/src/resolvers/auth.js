const bcrypt = require('bcryptjs');
const {
  User,
} = require('../models');

module.exports = {
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
          ...result._doc, // eslint-disable-line no-underscore-dangle
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
