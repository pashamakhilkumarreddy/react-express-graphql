const express = require('express');
const graphqlHttp = require('express-graphql');
const {
  buildSchema
} = require('graphql');

const config = require('./config');

const app = express();

const events = [{
  _id: Math.random(),
  title: 'Cena',
  description: 'Nein',
  price: 12,
  date: Date()
}];

const PORT = config.server.PORT || 3000;

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
      events() {
        return events;
      },
      createEvent(args) {
        const {
          title,
          description,
          price
        } = args.eventInput;
        const event = {
          _id: Math.random().toString(),
          title,
          description,
          price,
          date: Date()
        }
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.info(`Application is running on ${PORT}`);
});