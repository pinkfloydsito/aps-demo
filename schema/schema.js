const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');

const User = require('../models/user');
const Picture = require('../models/picture');

const typeDefs = gql`
  type User {
    id: String!
    username: String!
    password: String!
  }

  type Picture {
    filename: String!
    mimetype: String!
    encoding: String!  
  }

  type Query {
    uploads: [Picture]
  }

  type Mutation {
    singleUpload(file: Upload!): Picture!
  }`;

const resolvers = {
  Query: {
    uploads: (parent, args) => {
      return Picture.find({});
    },  },
  Mutation: {
    singleUpload: (parent, args) => {
      console.info(parent, args)
      return args.file.then(file => {
        const { filename } = file;
        const stream = file.createReadStream()

        return new Promise((resolve, reject) => {
          const fstream = fs.createWriteStream(__dirname + '/..' + '/files/' + filename)
          stream.pipe(fstream)

          fstream.on('finish', () => resolve())
          fstream.on('error', (error) => reject(error))
          fstream.on('close', function () {
            return file;
          });
        }).then((response) => {
          let picture = new Picture({
            ...file,
          });
          return picture.save();
        }).catch((err) => {
          return err;
        });
      });
    },
  }
};

module.exports = {
  typeDefs, resolvers
};
