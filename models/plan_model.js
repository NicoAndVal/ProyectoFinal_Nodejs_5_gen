const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schemaPlan = new Schema({
    valor: {
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    cantidad_clases: {
        type: Number,
        required: true,
    }
})


const model = mongoose.model('modelPlan', schemaPlan);

module.exports = model;