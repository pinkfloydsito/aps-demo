const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  filename: String,
  mimetype: String,
  encoding: String,
});

module.exports = mongoose.model('Picture', PictureSchema);
