var mongoose = require('mongoose');
var db = require('./mongoose-connection');

var MovieSchema = new mongoose.Schema({
  title: String
});
var MovieModel = mongoose.model('Movies', MovieSchema);


module.exports = MovieModel;