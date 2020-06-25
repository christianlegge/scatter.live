var mongoose = require('mongoose');
var db = require('./mongoose-connection');

var MultiworldPlayerSchema = new mongoose.Schema({
	ready: Boolean,
	name: String,
	num: Number,
	finished: Boolean,
});

var MultiworldPlaythroughSchema = new mongoose.Schema({
	num_players: Number,
	players: [MultiworldPlayerSchema],
	active: Boolean,
	log: Map,
	created_at: Date,
	use_logic: Boolean,
});
var MultiworldPlaythroughModel = mongoose.model('MultiworldPlaythrough', MultiworldPlaythroughSchema);

module.exports = MultiworldPlaythroughModel;