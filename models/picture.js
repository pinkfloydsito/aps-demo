const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  filename: String,
  mimetype: String,
  encoding: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Picture', PictureSchema);
