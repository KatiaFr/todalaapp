const { Router } = require('express');
const router = Router();

const { qy } = require('../database');


//consigo entrar a: http://localhost:3001/biblioteca/categoria
router.route('/')
    //tengo que poner async porque debo dejar establecido que voy a tener esta función asincrónica
    .get(async (req, res) => {

        try {

            let query = "SELECT * FROM categoria";
            let response = await qy(query);
            res.status(200).send(response);
        }
        catch (e) {
            console.error(e.message);
            res.status(413).send({ "Error": e.message });
        }
    })


    .post(async (req, res) => {
        try {

            let genero = req.body.nombre.toUpperCase();
    
            // Valido que me manden correctamente la información requerida (nombre)
            if (!genero) {
                throw new Error("Falta enviar el nombre");
            }
    
            // Verifico que no exista previamente esa categoria
            let query = "SELECT id FROM categoria WHERE nombre = ?";
            let response = await qy(query, [genero]);
            if (response.length > 0) {
                throw new Error("Esa categoria ya existe");
            }
    
            // Guardo la nueva categoria
            query = "INSERT INTO categoria (nombre) VALUE (?)";
            response = await qy(query, [genero]);
            console.log(response + "Se agregó la categoría de nombre:", genero);
            res.status(200).send({ "Se agregó la categoría con el siguiente número de id": response.insertId, "Nombre": genero});
        }
        catch (e) {
            console.error(e.message);
            res.status(413).send({ "Error": e.message });
        }
    });
    
    router.route('/:id')
    .get( async (req, res) => {
        try {

            let genero = req.body.nombre;


            let query = "SELECT * FROM categoria WHERE id= ?";
            let response = await qy(query, [req.params.id, genero]);
            if (response.length == 0) {
                throw new Error("Categoría no encontrada")
            }
            res.status(200).send(response);
        }
        catch (e) {
            console.error(e.message);
            res.status(413).send({ "Error: alfún dato no fue encontrado o algo así": e.message });
        }
    })
   
    .delete( async (req, res) => {
        try {

            let query = "SELECT * FROM libro WHERE categoria_id = ? ";
    
            let response = await qy(query, [req.params.id]);
    
            if (response.length > 0) {
                throw new Error("Esta categoria tiene libros asociados, no se puede borrar");
            }
    
            query = "DELETE FROM categoria WHERE id =?"; //no me puedo olvidar de poner where porque puedo borrar toda la tabla y estoy en problemas!!
            response = await qy(query, [req.params.id]);
    
            console.log(response + "esta es la respuesta al delete");
            res.status(200).send({
                "Se eliminó correctamente la siguiente cantidad de categorías ": response.affectedRows
            });
        } catch (e) {
            console.error(e.message); //lo muestro para mí
            res.status(413).send({
                "Categoría no encontrada o no se pudo eliminar": e.message
            }); //lo muestro al usuario
        }
    });

module.exports = router;



/*


app.delete("/categoria/:id", async (req, res) => {
    





*/

