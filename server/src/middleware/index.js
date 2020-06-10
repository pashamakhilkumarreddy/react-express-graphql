const jsonwebtoken = require('jsonwebtoken');

const {
  jwt,
} = require('../config');

module.exports = {
  checkAuthToken(req, res, next) { // eslint-disable-line
    try {
      const authHeader = req.get('Authorization');
      if (!authHeader) {
        req.isAuth = false;
        return next();
      }
      const token = authHeader.split(' ')[1]; // Bearer token
      if (!token) {
        req.isAuth = false;
        return next();
      }
      const decodedToken = jsonwebtoken.verify(token, jwt.JWT_SECRET);
      if (!decodedToken) {
        req.isAuth = false;
        return next();
      }
      req.isAuth = true;
      req.userId = decodedToken.userId;
      next();
    } catch (err) {
      console.error(err);
      req.isAuth = false;
      return next();
    }
  },
};
