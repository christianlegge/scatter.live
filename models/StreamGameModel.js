var mongoose = require('mongoose');
var db = require('./mongoose-connection');

var StreamGameSchema = new mongoose.Schema({
  title: String,
  upvotes: Number
});
var StreamGameModel = mongoose.model('StreamGames',StreamGameSchema);


module.exports = StreamGameModel;