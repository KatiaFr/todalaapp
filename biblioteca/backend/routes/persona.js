const { Router } = require('express');
const router = Router();

const { qy } = require('../database');


router.route('/')


.get( async (req, res) => {
    try {

        let query = "SELECT * FROM persona";
        let response = await qy(query);
        res.status(200).send(response);
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error configurado por mi": e.message });
    }
})

.post( async (req, res) => {

    let nombre = req.body.nombre.toUpperCase();
    let apellido = req.body.apellido.toUpperCase();
    let email = req.body.email.toUpperCase();
    let alias = req.body.alias.toUpperCase();

    try {

        if (!nombre || !apellido || !alias || !email) {
            throw new Error("hay algún dato que no fue enviado");
        }
        let query = "SELECT * FROM persona WHERE email = ?";
        let response = await qy(query, [email]);

        //Pregunto si ya había un mail registrado que se duplicaría
        if (response.length > 0) {
            throw new Error("Persona con email ya registrado, ingrese nuevos datos");
        }
        query = 'INSERT INTO persona (nombre, apellido, email, alias) VALUES (?, ?, ?, ?)';
        response = await qy(query, [nombre, apellido, email, alias]);

        console.log(response + "persona ingresada correctamente");
        res.status(200).send({ "Persona ingresada correctamente": response.insertId });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
})

.delete(async (req, res) => {
    
    try {
        let query = "SELECT * FROM libro WHERE persona_id = ? ";
        let response = await qy(query, [req.params.id]);
        if (response.length > 0) {
            throw new Error("Esta persona tiene libros prestados no se puede borrar");
        }
        if (response.length == 0) {
            throw new Error("Esta persona no existe");
        }
        query = "DELETE FROM persona WHERE id =?";
        response = await qy(query, [req.params.id]);
        console.log(response + "Esta es la respuesta al delete");
        res.status(200).send({ "Persona eliminada con éxito": response.affectedRows });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
});


router.route(':id')
.get( async (req, res) => {

    try {

        let query = "SELECT * FROM persona WHERE id = ?";
        let response = await qy(query, [req.params.id]);
        if (response.length == 0) {
            throw new Error("Libro no encontrado")
        }
        res.status(200).send({ "Respuesta": response });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
});


module.exports = router;
