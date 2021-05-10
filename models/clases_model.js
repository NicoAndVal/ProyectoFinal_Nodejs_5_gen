const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaClase = new Schema({
    dia_clase: {
        type: String,
        required:true
    },
    hora_inicio: {
        type: String,
        required: true
    },
    hora_final: {
        type: String,
        required: true
    },
    tipo_clase: {
        type: String,
        required: true
    },      
    alumnos: [{
        alumno: {
            type: Schema.Types.ObjectId,
            ref: 'modelAlumno',
            unique:true
        }
    }]
})



const model = mongoose.model('modelClase', schemaClase);

module.exports = model;