const { default: axios } = require("axios");

//Esto no está en uso
const respuesta = await axios.post(url, libro);


const respuesta = await axios.put("http:localhost:3002/persona/112", libro);
//esto lo recibe en req.params.id


const respuesta = await axios.put("http:localhost:3002/persona?id=112", libro);
//esto lo recibe en req.query.id
