const planRouter = require('./plan_router')
const alumnoRouter = require('./alumno_router')
const usuarioRouter = require('./usuario_router');
const claseRouter = require('./clase_router');

module.exports = (app) => {
    app.use('/api', planRouter);
    app.use('/api', alumnoRouter);
    app.use('/api', usuarioRouter);
    app.use('/api', claseRouter);
}