const mongoose = require('mongoose');
const {Schema} = mongoose;

const Transportschema = new Schema({
    _id: {type: String},
    brand: {type: String},
    model: {type: String},
    year: {type: Number},
    displacement: {type: Number},
    description: {type: String},
    path: {type: String}
});

module.exports = mongoose.model('Transport', Transportschema);