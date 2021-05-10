const express = require('express');

const router = express.Router();

const {validateSingUp} = require('../validators/vlogin');

const { signUp, login, eliminarUsuario, loginStudent } = require('../controller/usuario_controller');
const { isAuth, isTeacher } = require('../middleware/auth');

router.post('/signUp', validateSingUp,signUp);
router.post('/login',login);
router.post('/loginAlumno',loginStudent);
router.get('/user/:idUsuario', isAuth, isTeacher,eliminarUsuario);


module.exports = router;