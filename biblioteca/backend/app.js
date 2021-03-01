const express = require('express');
const app = express();

const cors = require('cors');


//middleware
app.use(cors());
app.use(express.json()); //para mapear el array
app.use(express.urlencoded());


//RUTAS: 

app.use('/biblioteca/persona', require('./routes/persona'))  //consigo entrar a: http://localhost:3001/ biblioteca/Usuario
app.use('/biblioteca/categoria', require('./routes/categoria'))   //consigo entrar a: http://localhost:3001/ biblioteca/notas
app.use('/biblioteca/categoria/:id', require('./routes/categoria'))   //consigo entrar a: http://localhost:3001/ biblioteca/notas
app.use('/biblioteca/libro', require('./routes/libro'))   //consigo entrar a: http://localhost:3001/ biblioteca/notas

//estas rutas se importaron en la carpeta routes mediante ROUTER y EN CADA Archivo de rutas hay que fijarse bien.
module.exports = app;
