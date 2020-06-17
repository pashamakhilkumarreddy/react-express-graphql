const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const {
  server,
} = require('./config');
const {
  getDBURI,
} = require('./utils');
const graphQLSchema = require('./schema');
const graphQLResolvers = require('./resolvers');
const {
  checkAuthToken,
} = require('./middleware');

const app = express();

const PORT = server.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(checkAuthToken);

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
