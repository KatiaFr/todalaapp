import React, { useState } from 'react';
import axios from 'axios';


export default function CrearPersona() {

    const [persona, setPersona] = useState('');
    //const [message, setMessage] = useState('');
    const url = "http://localhost:3001/biblioteca";


//para crear o postear los elementos siempre enviar el objeto completo,
//se va dividiendo por partes en cada función que fue llamada en los inputs onchange..
    const handleChangeNombre = (event) => {
        let personaAux = {
            nombre: event.target.value,
            apellido: persona.apellido,
            alias: persona.alias,
            email: persona.email,
        }
        setPersona(personaAux);
    }

    const handleChangeApellido = (event) => {
        let personaAux = {
            apellido: event.target.value,
            nombre: persona.nombre,
            alias: persona.alias,
            email: persona.email,
        }
        setPersona(personaAux);
    }
    const handleChangeAlias = (event) => {
        let personaAux = {
            alias: event.target.value,
            nombre: persona.nombre,
            apellido: persona.apellido,
            email: persona.email,
        }
        setPersona(personaAux);
    }

    const handleChangeEmail = (event) => {
        let personaAux = {
            email: event.target.value,
            nombre: persona.nombre,
            apellido: persona.apellido,
            alias: persona.alias,

        }
        setPersona(personaAux);
    }

    //función que llama al post del back con 
    const handleClick = async () => {
        try {
            //envío la url almacenada en la variable, la dirección y como parámetro final libro que se actualizará
            let responses = await axios.post(url + "/persona", persona);
            
            //llamo nuevamente a get PARA obtener la respuesta y saber por CONSOLA que
            // fue ingresado el libro correctamente como último array:
            responses =  await axios.get(url + "/persona");
            console.log(responses.data, "Persona ingresada" );

            if(!responses.data || responses.data?.lenght == 0) 
            {return;
            }
            //para limpiar el formulario:
            setPersona({nombre:"", apellido:"", alias:"", email:""}); 

        } catch (error) {
            console.log(error, "algún dato no fue enviado o falló la comunicación");
        }
    }


    return (
        <>
            <div className="container">

                <div className="AgregoPersona">
                    <h2>Agregar Persona:</h2>
                    <label className="form-check-label">
                        Nombre: </label>
                    <input id="label" name="nombre"
                        value={persona.nombre}
                        onChange={handleChangeNombre} >

                    </input>


                    <label className="form-check-label">
                        Apellido: </label>

                    <input id="label" value={persona.apellido}
                        onChange={handleChangeApellido}>
                    </input>

                    <label className="form-check-label">
                        Alias: </label>

                    <input id="label" value={persona.alias}
                        onChange={handleChangeAlias}>
                    </input>

                   <br/>
                    <label className="form-check-label">
                        Email : </label>

                    <input id="label" value={persona.email}
                        onChange={handleChangeEmail}>
                    </input>

                    <button onClick={handleClick}
                        type="button" className="btn btn-success"> Guardar Persona</button>
                </div>

            </div>
        </>
    );
}

