const express = require('express');
const graphqlHttp = require('express-graphql');
const {
  buildSchema
} = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {
  server
} = require('./config');
const {
  getDBURI
} = require('./utils');
const {
  Event,
  User,
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

      type User {
        _id: ID!
        email: String!
        password: String
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input UserInput {
        email: String!
        password: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
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
            creator: '5ede620d10983b64ab99db8c',
          });
          const result = await event.save();
          if (result) {
            User.findById('5ede620d10983b64ab99db8c').then(async user => {
              if (user) {
                user.createdEvents.push(result);
                await user.save();
              } else {
                throw new Error("User not Found!");
              }
            });
          }
          return {
            ...result._doc,
          };
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
      async createUser(args) {
        try {
          const {
            email,
            password
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
              ...result._doc,
              password: null,
            }
          }
          throw new Error("User already exists with the given email address");
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
  useCreateIndex: true,
}).then(() => {
  console.info(`Successfully connected to the database`);
  app.listen(PORT, () => {
    console.info(`Application is running on ${PORT}`);
  });
}).catch((err) => {
  console.error(`Can't connect to the database`, err);
})