import React, { useState } from 'react';
import axios from 'axios';


export default function CrearLibros() {

    const [libro, setLibro] = useState('');
    //const [message, setMessage] = useState('');
    const url = "http://localhost:3001/biblioteca";


//para crear o postear los elementos siempre enviar el objeto completo,
//se va dividiendo por partes en cada función que fue llamada en los inputs onchange..
    const handleChangeNombre = (event) => {
        let libroAux = {
            nombre: event.target.value,
            descripcion: libro.descripcion,
            categoria_id: libro.categoria_id,
        }
        setLibro(libroAux);
    }

    const handleChangeDescripcion = (event) => {
        let libroAux = {
            descripcion: event.target.value,
            nombre: libro.nombre,
            persona: libro.persona,
            categoria_id: libro.categoria_id,
        }
        setLibro(libroAux);
    }
    const handleChangePersona = (event) => {
        let libroAux = {
            persona: event.target.value,
            nombre: libro.nombre,
            descripcion: libro.descripcion,
            categoria_id: libro.categoria_id,
        }
        setLibro(libroAux);
    }

    const handleChangeCategoria = (event) => {
        let libroAux = {
            categoria_id: event.target.value,
            nombre: libro.nombre,
            descripcion: libro.descripcion,
            persona: libro.persona,
        }
        setLibro(libroAux);
    }

    //función que llama al post del back con 
    const handleClick = async () => {
        try {
            //envío la url almacenada en la variable, la dirección y como parámetro final libro que se actualizará
            let responses = await axios.post(url + "/libro", libro);
            
            //llamo nuevamente a get PARA obtener la respuesta y saber por CONSOLA que
            // fue ingresado el libro correctamente como último array:
            responses =  await axios.get(url + "/libro");
            console.log(responses.data, "libro ingresado" );

            if(!responses.data || responses.data?.lenght == 0) 
            {return;
            }
            //para limpiar el formulario:
            setLibro({nombre:"", descripcion:"", categoria_id:"", persona:""}); 

        } catch (error) {
            console.log(error, "algún dato no fue enviado o falló la comunicación");
        }
    }


    

    return (
        <>
            <div className="container">

                <div className="AgregoLibro">
                    <h2>Agregar LIBRO nuevo:</h2>
                    <label className="form-check-label">
                        Título: </label>
                    <input id="label" name="nombre"
                        value={libro.nombre}
                        onChange={handleChangeNombre} >

                    </input>


                    <label className="form-check-label">
                        Descripción: </label>

                    <input id="label" value={libro.descripcion}
                        onChange={handleChangeDescripcion}>
                    </input>

                    <label className="form-check-label">
                        categoría: </label>

                    <input id="label" value={libro.categoria_id}
                        onChange={handleChangeCategoria}>
                    </input>


                    <label className="form-check-label">
                        Prestar a* : </label>

                    <input id="label" value={libro.persona}
                        onChange={handleChangePersona}>
                    </input>

                    <button onClick={handleClick}
                        type="button" className="btn btn-success"> Guardar Libro</button>
                </div>

            </div>
        </>
    );
}

