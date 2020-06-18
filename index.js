const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema/schema');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var cors = require('cors')
const jwt = require('express-jwt')

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({ req }),
});
const app = express();

require('dotenv').config();
var amqp = require('amqp'),
    rabbitMq = amqp.createConnection({ host: 'localhost' });

const {
  PORT, DB_USER, DB_PASS, DB_URL, JWT_SECRET
} = process.env;

const auth = jwt({
  secret: JWT_SECRET,
  credentialsRequired: false
})

mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/graphql' }));

app.use('/static', express.static('files'));

apolloServer.applyMiddleware({ app });

const expressServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 

rabbitMq.on('ready', function () {
   io.sockets.on('connection', function (socket) {
      var queue = rabbitMq.queue('my-queue');

      queue.bind('#'); // all messages

      queue.subscribe(function (message) {
         socket.emit('message-name', message);
      });
   });
});


io = require('socket.io').listen(expressServer);
