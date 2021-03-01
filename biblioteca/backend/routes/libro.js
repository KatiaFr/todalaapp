const { Router } = require('express');
const router = Router();

const { qy } = require('../database');


router.route('/')


.get( async (req, res) => {
    try {

        let query = "SELECT * FROM libro";
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
    let descripcion = req.body.descripcion.toUpperCase();
    let categorid = req.body.categoria_id;
    let persona = req.body.persona_id;
    

    try {

        if (!nombre || !descripcion || !categorid) {
            throw new Error("Hay algún dato que no fue enviado");
        }
        let query = "SELECT * FROM categoria WHERE id = ?";
        let response = await qy(query, [categorid]);

        if (response.length == 0) {
            throw new Error("Esa categoria no existe");
        }
        //Se puede agregar libros de igual nombre pero en distintas categoria: Ejemplo: El alquimista, Ben Jonson (1983) El alquimista, Paulo Coelho (2007)
        query = "SELECT * FROM libro WHERE nombre = ? AND categoria_id = ?";
        response = await qy(query, [nombre, categorid]);
        if (response.length >= 1) {
            throw new Error("El nombre del libro ya existe en esa categoria");
        }
        query = "INSERT INTO libro (nombre, descripcion, categoria_id, persona_id) VALUES (?, ?, ?, ?)";
        response = await qy(query, [nombre, descripcion, categorid, null]);

        console.log(response + "libro ingresado correctamente");
        res.status(200).send({ "Libro ingresado correctamente": nombre, categorid, persona, descripcion, "con id": response.insertId });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error inesperado": e.message });
    }
})
;

router.route(':id')
.get( async (req, res) => {

    try {

        let query = "SELECT * FROM libro WHERE id= ?";
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
})


;
/*
//INICIO tabla libro//
//Método Get "/libro"




//Método post "/libro"
 .post( async (req, res) => {
//Consideramos que el campo de descripción debe ser obligatorio ya que en el se informa el autor/a del libro y una breve sinopsis.
    

//Método delete "/libro/:id"
 .delete("/:id", async (req, res) => {
    try {

        let query = "SELECT persona_id FROM libro WHERE id= ? ";
        let response = await qy(query, [req.params.id]);
        if (response.length == 0) {
            throw new Error("Ese libro no existe");
        }
        if (response[0].persona_id !== null) {
            throw new Error("Ese libro está prestado");
        }
        if (response[0].persona_id == null) {
            query = "DELETE FROM libro WHERE id = ? ";
            response = await qy(query, [req.params.id]);
        }
        console.log(response + "esta es la respuesta al delete correcto");
        res.status(200).send({ "Se borró correctamente": response.affectedRows });
    }    
        catch (e) {
            console.error(e.message); 
            res.status(413).send({ "Error": e.message }); 
        }
    })
    


//Método Put "/libro/:id"
 .put("/:id", async (req, res) => {

    let nombre = req.body.nombre.toUpperCase();
    let descripcion = req.body.descripcion.toUpperCase();
    let categorid = req.body.categoria_id;
    let personaid = req.body.persona_id;

    try {
//Se tomó la desición de que el usuario pueda modificar todos los datos ingresados del libro, ya que si se cargara con un error este podría ser enmendado. Por este motivo, la descripción no es el único campo modificable.
        if (!nombre || !descripcion || !categorid) {
            throw new Error("No se enviaron los datos necesarios para actualizar la información del libro");
        }

        /* para responder a la consigna, si se quisiera que no se cambie el nombre:
        let query = "SELECT * FROM libro WHERE nombre = ?";
        let response = await qy(query, [nombre, req.params.id]);
        if (response.length > 0){
            throw new Error("Este nombre de libro ya existe.");
        }
        */



        /*este quitar
        query = "SELECT * FROM categoria WHERE id = ?";
        response = await qy(query, [categorid]);

        if (response.length == 0) {
            throw new Error("No existe la categoria");
        }
        query = "UPDATE libro SET nombre = ?, descripcion = ?, categoria_id = ?, persona_id = ? WHERE id = ?";
        response = await qy(query, [nombre, descripcion, categorid, null, req.params.id]);

        res.status(200).send({
            "Modificación realizada en los siguientes campos": nombre, descripcion, categorid, personaid, "actualizado": response});
            console.log("Libro modificado");
    } 
    catch (e) {
        console.error(e.message); 
        res.status(413).send({ 
            "Error": e.message}); 
    }

})

//Método Put "/libro/prestar/:id"

 .put("/prestar/:id", async (req, res) => {
    let usuario = req.body.persona_id;
    try {
        if (!usuario) {
            throw new Error("Usted debe enviar `persona_id = x (número de id)` para  prestar del libro");
        }
        let query = "SELECT * FROM persona WHERE id = ? ";
        let response = await qy(query, [usuario]);
        if (response.length == 0) {
            throw new Error("No se puede PRESTAR este libro porque esta ID de usuario NO está registrada");
        }
        query = "SELECT persona_id FROM libro WHERE id= ? ";
        response = await qy(query, [req.params.id]);
        if (response.length === 0) {
            throw new Error("Ese libro no existe");
        }
        if (response[0].persona_id !== null) {
            throw new Error("Ese libro está prestado");
        }
        if (response[0].persona_id == null) {
            query = "UPDATE libro SET  persona_id = ? WHERE id = ?";
            response = await qy(query, [usuario, req.params.id]);
        }
        console.log(response + "esta es la respuesta al delete correcto");
        res.status(200).send({ "Modificación concretada, prestado al usuario con ID": usuario, response });

    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
})


//Método Put "/libro/devolver/:id"
 .put("/devolver/:id", async (req, res) => {

    try {

        let query = "SELECT persona_id FROM libro WHERE id= ? ";
        let response = await qy(query, [req.params.id]);

        if (response.length === 0) {
            throw new Error("Ese libro no existe");
        }
        if (response[0].persona_id === null) {
            throw new Error("Ese libro no está prestado");
        }
        if (response[0].persona_id !== null) {
            query = "UPDATE libro SET  persona_id = ? WHERE id = ?";
            response = await qy(query, [req.body.persona_id, req.params.id]);
        }

        res.status(200).send({ "Modificación concretada, libro devuelto": response });
    }
    catch (e) {
        console.error(e.message);
        res.status(413).send({ "Error": e.message });
    }
})
//FIN tabla libro//

*/


module.exports = router;
