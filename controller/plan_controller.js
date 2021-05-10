const ModelPlan = require('../models/plan_model');


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

function listaPlanes(req, res, next) {
    ModelPlan.find().exec((err, items) => {
        if(err|| !items) return errorHandler(items,next, err)
    
        return res.json({
            items: items
        })
    })


}

function agregarPlan(req, res, next) {

    let data = {
        valor: req.body.valor,
        nombre: req.body.nombre,
        cantidad_clases: req.body.cantidad_clases
    }

    let modeloPlan = new ModelPlan(data);

    modeloPlan.save((err, docPlan) => {
        if (err || !docPlan) return errorHandler(docPlan, next, err);
        
        res.json({
            data: docPlan
        })
    })

}

function eliminarPlan(req, res, next) {
    
    const id = req.body.id;
    
    ModelPlan.findOneAndDelete(id, (err, docPlan) => {
        if (err || !docPlan) return errorHandler(docPlan, next, err);

        return res.json({
            data: docPlan
        })
    })
}

function actualizarPlan(req, res, next) {

    const id = req.body.id

    const data = {
        valor: req.body.valor,
        nombre: req.body.nombre,
        cantidad_clases: req.body.cantidad_clases
    }

    ModelPlan.findByIdAndUpdate(id, data, { new: true }, (err, docPlan) => {
        if (err || !docPlan) return errorHandler(docPlan, next, err);

        return res.json({
            data: docPlan
        })
    } )
}


module.exports = {
    listaPlanes, 
    agregarPlan,
    eliminarPlan,
    actualizarPlan
}

