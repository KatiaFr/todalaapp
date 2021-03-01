import React, { useState } from 'react';
import axios from 'axios';

import './styles.css';


export default function CrearCategoria() {
    const [genero, setGenero] = useState('');
    const url = "http://localhost:3001/biblioteca";

    const handleChangeCategoria = (event) => {
        let generoAux = {
            nombre: event.target.value,
            categoria_id: genero.categoria_id,
        }
        setGenero(generoAux);
    }

    //función que llama al post del back con 
    const handleClick = async () => {
        try {
            //envío la url almacenada en la variable, la dirección y como parámetro final categoria que se actualizará
            let responses = await axios.post(url + "/categoria", genero);

            //llamo nuevamente a get PARA obtener la respuesta y saber por CONSOLA que
            // fue ingresado el categoria correctamente como último array:
            responses = await axios.get(url + "/categoria");
            console.log(responses.data, "categoria ingresado");

            if (!responses.data || responses.data?.lenght == 0) {
                return;
            }
            //para limpiar el formulario:
            setGenero({ nombre: "", });

        } catch (error) {
            console.log(error, "algún dato no fue enviado o falló la comunicación");
        }
    }

    /*deleteNote = async (id) => {
        await axios.delete("http://localhost:3001/anotador/categoria" + id);
        this.getNotes();
    }*/


    return (
        <>

            <div className="newCategorias">
                <h3>Agregar nuevas categorías/género:</h3>
                <label className="form-check-label"> Nuevo nombre: </label>

                <input id="label" value={genero.nombre}
                    onChange={handleChangeCategoria}>
                </input>

                <button onClick={handleClick}
                    type="button"
                    className="btn btn-success"> Agregar Categoría</button>
            </div>

        </>
    );
}