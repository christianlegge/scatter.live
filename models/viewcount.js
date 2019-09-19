var mongoose = require('mongoose');
var db = require('./mongoose-connection');

var viewcountSchema = new mongoose.Schema({
  path: String,
  views: Number
});
var viewcount = mongoose.model('viewcounts',viewcountSchema);


module.exports = viewcount;