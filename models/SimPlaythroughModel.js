var mongoose = require('mongoose');
var db = require('./mongoose-connection');

var SimPlaythroughSchema = new mongoose.Schema({
	locations: Map,
	checked_locations: Array,
	current_items: Array,
	start_time: Number,
	hints: Map,
	entrances: Map,
	hash: Array,
	current_age: String,
	current_region: String,
	known_medallions: Map,
	settings: Map,
	dungeons: Map,
});
var SimPlaythroughModel = mongoose.model('SimPlaythrough', SimPlaythroughSchema);

module.exports = SimPlaythroughModel;