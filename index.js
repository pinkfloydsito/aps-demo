const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema/schema');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var cors = require('cors')

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const app = express();
require('dotenv').config();

const {
  PORT, DB_USER, DB_PASS, DB_URL
} = process.env;

mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'application/graphql' }));

app.use('/static', express.static('files'));
// app.use(express.static(__dirname + '/files'));

apolloServer.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 
