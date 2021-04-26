var mongoose = require('mongoose');
var db = require('./mongoose-connection');

var OscarPredictionSchema = new mongoose.Schema({
  user: String,
  category: String,
  film: String,
  wanted: Boolean
});
var OscarPredictionModel = mongoose.model('OscarPredictions', OscarPredictionSchema);

module.exports = OscarPredictionModel;
