const express = require('express');
const app = express();
const mongoose = require('mongoose')
var cors = require('cors')
const router = require('./routers/index')
app.use(express.json());


//Routes
router(app);


//Handler
app.use(function (err, req, res, next) {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;

  res.status(status).json({
    message: message,
    data: data
  })
})

app.use(cors());

mongoose.connect('mongodb://localhost/proyectoFinal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log('Mongo ok');
})


app.listen('8080', () => {
    console.log('El servidor está listo')
})