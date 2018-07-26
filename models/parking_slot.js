var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;



var parkingSchema = new Schema({
	_id: {
		type: String,
    	'default': shortid.generate
    },	
    Registration: {type: String, required: true, unique: true},
    Color: {type: String, required: true},
    Slot_no: {type: Number, required: true, unique: true,}

});

const parking_slot = mongoose.model('parking_slot', parkingSchema)

module.exports = parking_slot;