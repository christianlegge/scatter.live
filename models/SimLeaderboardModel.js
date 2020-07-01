var mongoose = require('mongoose');
var db = require('./mongoose-connection');

var SimLeaderboardSchema = new mongoose.Schema({
	finish_date: Date,
	playtime: Number,
	name: String,
	checked_locations: Number,
	total_locations: Number,
	settings: Map,
	seed: String,
	settings_string: String,
});
var SimLeaderboardModel = mongoose.model('SimLeaderboard', SimLeaderboardSchema);

module.exports = SimLeaderboardModel;