const express = require('express');
const router = express.Router();

const { agregarClase, mostrarClases, actualizarClase, eliminarClase, agregarAlumnos } = require('../controller/clase_controller')

router.post('/agregarClase', agregarClase);
router.get('/clases', mostrarClases);
router.put('/clases/:idClase', actualizarClase);
router.delete('/clases/:idClase', eliminarClase);
router.post('/agregarAlumnos/:idClase', agregarAlumnos);

module.exports = router;