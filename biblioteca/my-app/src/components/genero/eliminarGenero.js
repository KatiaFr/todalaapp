import axios from "axios";

export default function EliminarGenero({ categoria }) { //acá va el parámetro categoría que se actualiza eh! 

    const eliminar = async () => {
        const url = "http://localhost:3001/biblioteca/categoria/ ";

        try {
            //envío la url almacenada en la variable, la dirección y como parámetro final categoria que se actualizará
            let responses = await axios.delete(url + categoria.id, categoria);

            

            console.log(responses.data, "categoria borrada");

            if (!responses.data || responses.data?.lenght == 0) {
                return ;
            }
            window.confirm('se eliminó la categoría:'+ categoria.nombre);

        } catch (error) {
            console.log(error, "algún dato no fue enviado o falló la comunicación");
            window.confirm( categoria.nombre + " tiene libros asociados o no se puede eliminar");
        }
    }
    return (
        <tr>
            <td>{categoria.id}</td>
            <td>{categoria.nombre}</td>

            <td>
                <button onClick={eliminar}
                    type="button"
                    className="btn btn-success"> bai Categoría</button>
            </td>
        </tr>
    );
}
