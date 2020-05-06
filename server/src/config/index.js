require('dotenv').config();

module.exports = {
  server: {
    PORT: process.env.PORT,
  },
  db: {
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
  },
};
