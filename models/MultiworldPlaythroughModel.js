var mongoose = require('mongoose');
var db = require('./mongoose-connection');

var MultiworldPlaythroughSchema = new mongoose.Schema({
	num_players: Number,
	players: [{
		ready: Boolean,
		id: mongoose.Types.ObjectId,
		name: String,
		num: Number,
	}],
	active: Boolean,
	log: Map,
	created_at: Date,
	use_logic: Boolean,
});
var MultiworldPlaythroughModel = mongoose.model('MultiworldPlaythrough', MultiworldPlaythroughSchema);

module.exports = MultiworldPlaythroughModel;