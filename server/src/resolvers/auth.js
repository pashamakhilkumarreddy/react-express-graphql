const bcrypt = require('bcryptjs');
const {
  User,
} = require('../models');

const {
  jwtSignUser,
} = require('../utils');

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
  async login({
    email,
    password,
  }) {
    try {
      const user = await User.findOne({
        email,
      });
      console.log(user);
      if (!user) {
        throw new Error("User doesn't exist");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Incorrect credentials');
      }
      const token = jwtSignUser({
        id: user._id, // eslint-disable-line no-underscore-dangle
        email: user.email,
      });
      return {
        userId: user._id, // eslint-disable-line no-underscore-dangle
        token,
        tokenExpiration: 60 * 60 * 24 * 7,
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
