const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const alumnoSchema = new Schema({

    nombre: {
        type: String,
        required:true
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'modelPlan'
    },
    clases_restantes: {
        type: Number,
        default: 0
    },
    clases_realizadas: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required:true
    },
    pass:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "ROLE_STUDENT"
    }
})

const model = mongoose.model('modelAlumno', alumnoSchema);

module.exports = model;