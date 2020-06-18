const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user');
const Picture = require('../models/picture');

const { decodedToken } = require('../jwt/decodedToken');

const {
  JWT_SECRET
} = process.env;

const typeDefs = gql`
  type User {
    id: String!
    username: String!
    email: String!
  }

  type Picture {
    filename: String!
    mimetype: String!
    encoding: String!  
  }

  type Query {
    uploads: [Picture]
    me: User
  }

  type Mutation {
    singleUpload(file: Upload!): Picture!
    signup (username: String!, email: String!, password: String!): String
    login (email: String!, password: String!): String
  }`;

const resolvers = {
  Query: {
    uploads: (parent, args, { req }) => {
    /* TODO: Handle pictures with users in query */
      const decoded = decodedToken(req);
      return Picture.find({ user: decoded.id });
    },
    async me (_, args, { req }) {
      // make sure user is logged in
      const decoded = decodedToken(req);

      // user is authenticated
      return await User.findById(decoded.id)
    }
  },
  Mutation: {
    async signup (_, { username, email, password }) {
          const user = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10)
          })

          // return json web token
          return jsonwebtoken.sign(
            { id: user.id,
              email: user.email },
            JWT_SECRET,
            { expiresIn: '1y' }
          )
        },
    async login (_, { email, password }) {
      const user = await User.findOne({ email })
    if (!user) {
      throw new Error('No user with that email')
    }

    const valid = await bcrypt.compare(password, user.password)
    
    if (!valid) {
      throw new Error('Incorrect password')
    }

    // return json web token
    return jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
  },

    /* TODO: Handle pictures with users, stop allowing anybody to upload images */
    singleUpload: (parent, args, { req }) => {
      const decoded = decodedToken(req);

      const {
        id: userId
      } = decoded;

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
            user: userId,
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
