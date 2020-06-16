const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

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

app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'application/graphql' }));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true,
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}); 

