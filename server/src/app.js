const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const {
  server,
} = require('./config');
const {
  getDBURI,
} = require('./utils');
const graphQLSchema = require('./schema');
const graphQLResolvers = require('./resolvers');

const app = express();

const PORT = server.PORT || 3000;

app.use(express.json());

app.use('/graphql',
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true,
  }));

mongoose.connect(getDBURI(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.info('Successfully connected to the database');
  app.listen(PORT, () => {
    console.info(`Application is running on ${PORT}`);
  });
}).catch((err) => {
  console.error('Can\'t connect to the database', err);
});
