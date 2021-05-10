const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "PROFESOR"
    },
    pass: {
        type: String,
        required: true
    }
})

const model = mongoose.model('modelUsuario', usuarioSchema);

module.exports = model;