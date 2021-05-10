const ModelClase = require('../models/clases_model');
const ModelAlumno = require('../models/alumno_model');
const ModelDay = require('../models/dia_model');
//Manejo de errores
function errorHandler(data, next, err = null) {

  if(err){
    return next(err);
  }

  if(!data){

    let error = new Error('No existe !');
    error.statusCode = 404;
    return next(error)
    
  }

}

//Agregar los días de la semana 
function agregarDia(req, res, next) {
  try {
    const day = new ModelDay(req.body);
    return res.json(day)
  } catch (error) {
    console.log(error);
    next()
  }
}


function agregarClase(req, res, next) {

    // let data = {
    //     dia_clase : req.body.dia_clase,
    //     horarios: req.body.horarios,
    //     alumno: []
    // }

    const modelClase = new ModelClase(req.body);
    try {
        modelClase.save((err, docClase) => {
            if (err || !docClase) return errorHandler(docClase, next, err);
    
            return res.json(docClase);
        })
    } catch (error) {
        console.log(error);
        next();
    }
}
async function mostrarClases(req, res, next) {
    try {
      const clases = await ModelClase.find({}).populate({
        path: 'alumnos.alumno',
        model: 'modelAlumno'
      })
      return res.json(clases);
    } catch (error) {
      console.log(error);
      next();
    }
}

async function actualizarClase(req, res, next) {
  try {

    let data = {
      dia_clase: req.body.dia_clase,
      horarios: req.body.horarios,
      alumnos: req.body.alumnos
    }
    
    console.log(data);

    const clase = await ModelClase.findByIdAndUpdate({ _id: req.params.idClase }, req.body, { new: true })
    
    return res.json(clase);
  } catch (error) {
    console.log(error);
    next();
  }
}

async function agregarAlumnos(req, res, next) {
  try {
    const clase = await ModelClase.findById(req.params.idClase);


    let data = {
      _id: clase.id,
      nombre: clase.nombre,
      dia_clase: clase.dia_clase,
      hora_inicio: clase.hora_inicio,
      hora_final: clase.hora_final,
      tipo_clase: clase.tipo_clase,
      alumnos: req.body.alumnos
    }
    const claseNueva = await ModelClase.findByIdAndUpdate({ _id: req.params.idClase }, data, { new: true })
    return res.json(claseNueva)
  } catch (error) {
    console.log(error);
    next();
  }
}

async function eliminarClase(req, res, next) {
  try {
    const clase =await ModelClase.findByIdAndRemove(req.params.idClase)
    return res.json(clase);
  } catch (error) {
    console.log(error);
    next();
  }
}

module.exports = {
  agregarClase,
  mostrarClases,
  actualizarClase,
  eliminarClase,
  agregarAlumnos
}