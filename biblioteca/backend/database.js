const index = require ('./index'); //no recuerdo por qué lo puse acá JA
const mysql = require("mysql");

const util = require("util"); // módulo para permitir el uso de asyn-away en la conexión mysql


//string de conexión:
const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "biblioteca",
});

//callback que responde en caso de error
conexion.connect((error) => {
    if (error) {
        throw error;
    }
    console.log("Conexión con la base de datos mysql establecida");
});

//posterior a la conexión voy a llamar a util
const qy = util.promisify(conexion.query).bind(conexion); //permite el uso de async-away en la conexión mysql, cuando en realidad el async away que sólo funciona sobre promisses y no sobre callbacks como está acá hecho
//acá quedó almacenado conexion.query 

module.exports = {qy} 
//estoy exportando la constante para reutilizarla en los pedidos de las rutas
