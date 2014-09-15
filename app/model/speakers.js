var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SpeakerSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Speaker', SpeakerSchema);