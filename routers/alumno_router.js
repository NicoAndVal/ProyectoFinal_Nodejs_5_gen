const express = require('express')

const{ agregarAlumno, obtenerAlumnos, obtenerAlumno, editarAlumno, eliminarAlumno} = require('../controller/alumno_controller');
const { isAuth, isTeacher, isStudent } = require('../middleware/auth');
const {validateSignUpStudent } = require('../validators/vlogin');

const router = express.Router();

router.all('/alumno', isAuth);

router.get('/alumno', isTeacher, obtenerAlumnos);
router.get('/alumno/:idAlumno',isAuth, isStudent,obtenerAlumno);
router.post('/alumno',validateSignUpStudent,isTeacher,agregarAlumno);
router.put('/alumno', isTeacher, editarAlumno);
router.delete('/alumno', isTeacher,eliminarAlumno )

module.exports = router;

