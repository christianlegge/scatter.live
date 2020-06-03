var mongoose = require('mongoose');
var db = require('./mongoose-connection');

var SimPlaythroughSchema = new mongoose.Schema({
	locations: Map,
	checked_locations: Array,
	current_items: Array,
	start_time: Number,
	hints: Map,
	entrances: Map,
	hash: Array
});
var SimPlaythroughModel = mongoose.model('SimPlaythrough', SimPlaythroughSchema);

module.exports = SimPlaythroughModel;