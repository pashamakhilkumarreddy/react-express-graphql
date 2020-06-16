const jsonwebtoken = require('jsonwebtoken');

const {
  jwt,
} = require('../config');

const ONE_WEEK = 60 * 60 * 24 * 7;

const jwtSignUser = ({
  userId,
  email,
}, expires = ONE_WEEK) => jsonwebtoken.sign({
  userId,
  email,
}, jwt.JWT_SECRET, {
  expiresIn: expires,
});

module.exports = {
  jwtSignUser,
};
