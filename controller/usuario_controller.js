const ModelUsuario = require('../models/usuario_model');
const ModelAlumno = require('../models/alumno_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

function signUp(req, res, next) {
  
  const salt = bcrypt.genSaltSync();
  
  
    let data = {
        nombre :req.body.nombre,
        email : req.body.email,
        pass : bcrypt.hashSync(req.body.pass, salt),
  }
  let modelUsuario = new ModelUsuario(data);

  modelUsuario.save((err, docUsuario) => {
    if (err || !docUsuario) return errorHandler(docUsuario, next, err);

    let payload = {
      userId : docUsuario._id,
      role  : docUsuario.role
    }

    let token = jwt.sign(
      payload,
      'claveSecretaApi'
    )

    return res.json({
      usuario: {
          userId: docUsuario._id,
          nombre: docUsuario.nombre,
          role: docUsuario.role
      },
      token
      })

    })
}

function login(req, res, next) {

  let email = req.body.email;
  let pass = req.body.pass;


  try {
    ModelUsuario.findOne({email:email}).exec((err, docUsuario) => {

      if (!bcrypt.compareSync(pass, docUsuario.pass)) {
        return res.status(404).json({
          message: 'Usuario o password incorrectos'
        })
      }

      let payload = {
        usuarioId: docUsuario._id,
        role: docUsuario.role
      }

      let token = jwt.sign(
        payload,
        'claveSecretaApi'
      )

      return res.json({
        usuario: {
          userId: docUsuario._id,
          nombre: docUsuario.nombre,
          role: docUsuario.role
        },
        token
        })


      
    })
  } catch (error) {
    console.log(error);
    next();
  }
}
function loginStudent(req, res, next) {

  let email = req.body.email;
  let pass = req.body.pass;

  try {

    ModelAlumno.findOne({email:email}).exec((err, docUsuario) => {

      if (err || !docUsuario) return errorHandler(docUsuario, next, err);

      if (!bcrypt.compareSync(pass, docUsuario.pass)) {
        return res.status(404).json({
          message: 'Usuario o password incorrectos'
        })
      }

      let payload = {
        usuarioId: docUsuario._id,
        role: docUsuario.role
      }

      let token = jwt.sign(
        payload,
        'claveSecretaApi'
      )

      return res.json({
        usuario: {
          userId: docUsuario._id,
          nombre: docUsuario.nombre,
          role: docUsuario.role
        },
        token
        })


      
    })
  } catch (error) {
    console.log(error);
    next();
  }
}

function eliminarUsuario(req, res, next) {
  try { 
    ModelUsuario.findByIdAndDelete(req.params.idUsuario).exec((err, docUsuario) => {
      if (err || !docUsuario) return errorHandler(docUsuario, next, err);

      return res.json({
        message:'Usuario Eliminado con éxito'
      })
    })
  } catch (error) {
    console.log(error);
    next();
  }
}



module.exports = {
  signUp,
  login,
  eliminarUsuario,
  loginStudent
}