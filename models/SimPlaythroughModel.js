var mongoose = require('mongoose');
var db = require('./mongoose-connection');

var SimPlaythroughSchema = new mongoose.Schema({
	uuid: String,
	locations: Map,
	checkedLocations: Array,
	currentItems: Array,
	startTime: Number,
	hints: Map,
	entrances: Map,
	hash: Array
});
var SimPlaythroughModel = mongoose.model('SimPlaythrough', SimPlaythroughSchema);

module.exports = SimPlaythroughModel;