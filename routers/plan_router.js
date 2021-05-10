const express = require('express')
const router = express.Router();

const { agregarPlan,
    eliminarPlan,
    listaPlanes,
    actualizarPlan    
} = require('../controller/plan_controller');
const { isAuth, isTeacher } = require('../middleware/auth');

router.get('/plan', listaPlanes)
router.post('/plan', isAuth, isTeacher, agregarPlan)
router.delete('/plan', isAuth, isTeacher,eliminarPlan)
router.put('/plan',isAuth, isTeacher, actualizarPlan)

module.exports = router;