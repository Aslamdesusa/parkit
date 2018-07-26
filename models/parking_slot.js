var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var parkingSchema = new Schema({	
    Registration: String,
    Color: String,
    Slot_no: {type: Number, required: true, unique: true,}

});

const parking_slot = mongoose.model('parking_slot', parkingSchema)

module.exports = parking_slot;