const {
  db,
} = require('../config');

const getDBURI = (dbHOST = db.DB_HOST, dbPORT = db.DB_PORT, // eslint-disable-line no-unused-vars
  dbName = db.DB_NAME, dbUSER = db.DB_USER,
  dbPASSWORD = db.DB_PASSWORD) => `mongodb+srv://${dbUSER}:${dbPASSWORD}@${dbHOST}/${dbName}?retryWrites=true&w=majority`;

module.exports = {
  getDBURI,
};
