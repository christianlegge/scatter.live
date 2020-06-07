var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

module.exports = db;