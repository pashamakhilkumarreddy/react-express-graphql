const jsonwebtoken = require('jsonwebtoken');

const {
  jwt,
} = require('../config');

const ONE_WEEK = 60 * 60 * 24 * 7;

const jwtSignUser = ({
  id,
  email,
}, expires = ONE_WEEK) => jsonwebtoken.sign({
  id,
  email,
}, jwt.JWT_SECRET, {
  expiresIn: expires,
});

module.exports = {
  jwtSignUser,
};
