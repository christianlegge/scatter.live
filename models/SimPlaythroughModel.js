var mongoose = require('mongoose');
var db = require('./mongoose-connection');

var SimPlaythroughSchema = new mongoose.Schema({
	use_logic: Boolean,
	locations: Map,
	checked_locations: Array,
	current_items: Array,
	start_time: Number,
	playtime: Number,
	hints: Map,
	known_hints: Map,
	entrances: Map,
	hash: Array,
	current_age: String,
	current_region: String,
	current_subregion: String,
	known_medallions: Map,
	settings: Map,
	dungeons: Map,
	trials: Map,
	bombchu_count: Number,
	finished: false,
	num_checks_made: Number,
	total_checks: Number,
	route: Array,
});
var SimPlaythroughModel = mongoose.model('SimPlaythrough', SimPlaythroughSchema);

module.exports = SimPlaythroughModel;