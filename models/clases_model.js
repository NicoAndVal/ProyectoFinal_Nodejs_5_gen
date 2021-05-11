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


schemaClase.methods.addAlumno = function (alumno) {
    
    let alumnosIncritos = [...this.alumnos];
    
    //Busco si el alumno está inscrito en la clase
    let index = this.alumnos.findIndex(item => {
        return item._id.toString() === alumno._id.toString();
    })


    if (index >=0) {
        return new Error('El alumno ya se encuentra en la clase');
    } else {
        alumnosIncritos.push(alumno)
    }

    this.alumnos = alumnosIncritos;
    return this.save();

}

schemaClase.methods.deleteAlumno = function (alumno) {
    
    let alumnosIncritos = [...this.alumnos];

    //Elimino el alumno que está inscrito en la clase
    let newAlumnos = alumnosIncritos.filter(alumnoI => {
        return alumnoI._id.toString() !== alumno._id.toString();
    }) 
    this.alumnos = newAlumnos;
    return this.save();

}



const model = mongoose.model('modelClase', schemaClase);

module.exports = model;