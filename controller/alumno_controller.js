const ModelAlumno = require('../models/alumno_model')
const ModelPlan = require('../models/plan_model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const errorHandler = (data, next, err = null) =>{
    if (err) {
        return next(err);
    }

    if (!data) {
        let error = new Error('No existe!');
        error.statusCode = 404;
        next(error);
    }
}

async function agregarAlumno(req, res, next) {

    const salt = bcrypt.genSaltSync();

    let plan = await ModelPlan.findOne({ nombre: req.body.plan }).exec();

    let data = {
        nombre: req.body.nombre,
        plan: plan,
        email: req.body.email,
        pass: bcrypt.hashSync(req.body.pass, salt),
        role: req.body.role,
        clases_restantes: plan.cantidad_clases
    }

    let modelAlumno = new ModelAlumno(data);

    modelAlumno.save((err, alumnoDoc) => {
        if (err || !alumnoDoc) return errorHandler(alumnoDoc, next, err);

        let payload = {
        userId : alumnoDoc._id,
        role  : alumnoDoc.role
        }

        let token = jwt.sign(
        payload,
        'claveSecretaApi'
        )

        return res.json({
        usuario: {
            userId: alumnoDoc._id,
            nombre: alumnoDoc.nombre,
            role: alumnoDoc.role
        },
        token
        })
    })
     
}

async function obtenerAlumnos(req, res, next) {
    try {
        const alumno = await ModelAlumno.find({}).populate('modelPlan').populate({
            path: 'plan',
            model: 'modelPlan'
        })

        res.json(alumno)
    } catch (error) {
        console.log(error);
        next();
    }
}

async function obtenerAlumno(req, res, next) {
    try {
        const alumno = await ModelAlumno.findById(req.params.idAlumno).populate('modelPlan').populate({
            path: 'plan',
            model: 'modelPlan'
        })

        res.json(alumno)
    } catch (error) {
        console.log(error);
        next();
    }
}

async function editarAlumno(req, res, next) {

    let plan = await ModelPlan.findOne({ nombre: req.body.plan }).exec();

    let data = {
        nombre: req.body.nombre,
        clases_restantes: req.body.clases_restantes,
        plan: plan
    }

    ModelAlumno.findByIdAndUpdate(req.body.id, data, { new: true }, (err, docAlumno) => {
        if (err || !docAlumno) return errorHandler(docAlumno, next, err);

        return res.json(docAlumno);
    })
}

async function eliminarAlumno(req, res, next) {
    ModelAlumno.findByIdAndDelete(req.body.id).exec((err, docAlumno) => {
        if (err || !docAlumno) return errorHandler(docAlumno, next, err);

        res.json(docAlumno);
    })
}

module.exports = {
    agregarAlumno,
    obtenerAlumnos,
    obtenerAlumno,
    editarAlumno,
    eliminarAlumno
}