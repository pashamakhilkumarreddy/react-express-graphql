const express = require('express');
const graphqlHttp = require('express-graphql');
const {
  buildSchema
} = require('graphql');
const mongoose = require('mongoose');

const {
  server
} = require('./config');
const {
  getDBURI
} = require('./utils');
const {
  Event
} = require('./models');

const app = express();

const PORT = server.PORT || 3000;

app.use(express.json());

app.use('/graphql',
  graphqlHttp({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      async events() {
        const events = await Event.find({});
        return events.map(event => ({
          ...event._doc
        }));
      },
      async createEvent(args) {
        try {
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
          });
          const result = await event.save();
          return {
            ...result._doc,
          };
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    },
    graphiql: true
  })
);

mongoose.connect(getDBURI(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.info(`Successfully connected to the database`);
  app.listen(PORT, () => {
    console.info(`Application is running on ${PORT}`);
  });
}).catch((err) => {
  console.error(`Can't connect to the database`, err);
})