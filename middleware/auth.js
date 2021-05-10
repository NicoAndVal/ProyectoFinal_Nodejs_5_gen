const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, 'claveSecretaApi', (err, decoded) => {
        if (err) {
            err.statusCode = 401;

            next(err);
        }

        req.usuario = decoded;
        next();
    })
}

const isTeacher = (req, res, next) => {
    const usuario = req.usuario;

    if (usuario.role === "PROFESOR") {
        next();
    } else {
        let err = new Error('No es profesor');
        err.statusCode = 401;
        next(err)
    }
}

const isStudent = (req, res, next) => {
    const usuario = req.usuario

    if (usuario.role === "ROLE_STUDENT" || usuario.role ==="PROFESOR") {
        next()
    } else {
        let err = new Error('Rol No valido');
        err.statusCode = 401;
        next(err);
    }
}

module.exports = {
    isAuth,
    isTeacher,
    isStudent
}