const express = require('express');
const router = express.Router();

const { agregarClase, mostrarClases, actualizarClase, eliminarClase, agregarAlumnos, eliminarAlumno, sumarClase } = require('../controller/clase_controller')

router.post('/agregarClase', agregarClase);
router.get('/clases', mostrarClases);
router.put('/clases/:idClase', actualizarClase);
router.delete('/clases/:idClase', eliminarClase);
router.post('/agregarAlumnos/:idClase', agregarAlumnos);
router.delete('/eliminaralumno/:idClase', eliminarAlumno);
router.post('/sumarClase/:idClase', sumarClase);

module.exports = router;