const { body,validationResult } = require("express-validator")
const ModelUsuario = require('../models/usuario_model');
const ModelAlumno = require('../models/alumno_model')

const pSignUp = [
    body('nombre').trim().not().isEmpty().withMessage('El nombre es requerido'),
    body('email').
        isEmail()
        .withMessage('Ingrese un email valido')
        .custom((value) => {
            return ModelUsuario.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Este correo ya existe en la BD')
                }
            })
        }),
    body('pass')
        .trim()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
        .withMessage('La constraseña debe tener números, caracteres especiales, minusculas y mayusculas')
        .isLength({ min: 5 })
        .withMessage('La contraseña debe tener mínimo 5 caracteres')
];

const vSignUp = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const arrayErrors = new Error('Fallo en la validación');
        arrayErrors.statusCode = 422;
        arrayErrors.data = errors.array();
        return next(arrayErrors);
    }
    next();
}

const pSignUpStudent = [
    body('nombre').trim().not().isEmpty().withMessage('El nombre es requerido'),
    body('email').
        isEmail()
        .withMessage('Ingrese un email valido')
        .custom((value) => {
            return ModelAlumno.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Este correo ya existe en la BD')
                }
            })
        }),
    body('pass')
        .trim()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
        .withMessage('La constraseña debe tener números, caracteres especiales, minusculas y mayusculas')
        .isLength({ min: 5 })
        .withMessage('La contraseña debe tener mínimo 5 caracteres')
];

const vSignUpStudent = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const arrayErrors = new Error('Fallo en la validación');
        arrayErrors.statusCode = 422;
        arrayErrors.data = errors.array();
        return next(arrayErrors);
    }
    next();
}

const validateSingUp = [pSignUp, vSignUp];
const validateSignUpStudent = [pSignUpStudent,vSignUpStudent]

module.exports = {
    validateSingUp,
    validateSignUpStudent
}
