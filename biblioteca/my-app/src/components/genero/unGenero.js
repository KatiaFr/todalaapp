import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch } from "react-router-dom";



export default function UnaCategoria() {
    let match = useRouteMatch("/:id");
    let generoID = match.params.id;

    const [categoria, setCategoria] = useState({});
    const url = "http://localhost:3001/biblioteca/";

    useEffect(async () => {

            try {
                const responses = await axios.get(url + generoID);
                console.log(responses.data); 
                  setCategoria(responses.data[0]);
            }
            catch (e) {
                console.log("catch de LsitadeCategorías frontend", e);
            }
        }, [])

    return (
        <div>
   <tr>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
            </tr>
            <pre>

            </pre>
            <button type="button"
                className="btn btn-warning">
                eliminar</button>

        </div>
    )
}
