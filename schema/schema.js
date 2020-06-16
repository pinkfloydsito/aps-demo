const { GraphQLUpload } = require('graphql-upload')
var fs = require('fs');

const graphql = require('graphql');
const User = require('../models/user');
const Picture = require('../models/picture');

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
  GraphQLList,GraphQLNonNull, GraphQLBoolean,
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID  },
        username: { type: GraphQLString }, 
        password: { type: GraphQLString }, 
    })
});

const PictureType = new GraphQLObjectType({
    name: 'Picture',
    fields: () => ({
        id: { type: GraphQLID },
        path: { type: GraphQLString },
        user: {
          type: UserType,
          resolve(parent, args) {
            return User.findById(parent.userId);
          }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        picture: {
            type: PictureType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Picture.findById(args.id);
            }
        },
        pictures: {
            type: new GraphQLList(PictureType),
            args: { userId: { type: GraphQLID } },
            resolve(parent, args) {
              return Picture.find({userId: args.userId});
            }
        },
    }
});
 
//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                //GraphQLNonNull make these field required
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new User({
                    username: args.username,
                    password: args.password
                });
                return user.save();
            }
        },
        addPicture:{
          type: PictureType,
          description: 'Uploads an image.',
          args: {
            image: {
              description: 'Image file.',
              type: GraphQLUpload
            }
          },
          async resolve(parent, { image }) {
            const { filename, mimetype, createReadStream } = await image
            const stream = createReadStream()
            const fstream = fs.createWriteStream(__dirname + '/files/' + filename);
            stream.pipe(fstream);
            fstream.on('close', function () {
                let picture = new Picture({
                  path: filename, 
                  userId: null,
                });
                return picture.save();
            });
          }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});
