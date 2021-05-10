const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaDay = Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    }
})

const model = mongoose.model('modelDay', schemaDay);

module.exports = model;