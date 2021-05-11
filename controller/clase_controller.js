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

    const alumno = await ModelAlumno.findById(req.body.alumno);

    clase.addAlumno(alumno);

    res.json(clase);

  } catch (error) {
    console.log(error);
    next();
  }
}
async function eliminarAlumno(req, res, next) {
  try {
    const clase = await ModelClase.findById(req.params.idClase);
    const alumno = await ModelAlumno.findById(req.body.alumno);
    clase.deleteAlumno(alumno);
    return res.json(clase);
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

async function sumarClase(req, res, next) {
  try {
    let idAlumno = req.body._id
    const clase = await ModelClase.findById(req.params.idClase);
    //Ver si el alumno está en la clase 
    const alumnoInscrito = clase.alumnos.filter(al => al._id.toString() === idAlumno.toString());
    //Actualizar el alumno, si fue o no se verá en el valor enviado 
    if (alumnoInscrito.length > 0) {
        let alumno =await ModelAlumno.findById(alumnoInscrito);
        let clases_realizadas = alumno.clases_realizadas;
        let clases_restantes = alumno.clases_restantes;
        if (req.body.presente || clases_restantes>0) {
          clases_realizadas += 1;
          clases_restantes -= 1;
          let data = {
            clases_realizadas,
            clases_restantes
          }
          ModelAlumno.findByIdAndUpdate(alumnoInscrito, data, { new: true }, (err, docAlumno) => {
            if (err || !docAlumno) return errorHandler(docAlumno, next, err);

            return res.json(docAlumno);
          })
            
        }
    } else {
      return res.json('El alumno no inscrito en la clase');
    }
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  agregarClase,
  mostrarClases,
  actualizarClase,
  eliminarClase,
  agregarAlumnos,
  eliminarAlumno,
  sumarClase
}