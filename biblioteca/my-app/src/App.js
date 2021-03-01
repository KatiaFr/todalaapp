//app de frontend 
import axios from "axios";

import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navegador from './components/Navegador';
import ListaDePersonas from './components/ListaDePersonas';
import CrearLibro from './components/CrearLibro';
import ListaDeCategorias from './components/ListaDeCategorias'; //El que vas a ver como página principal - home al entrar a: http://localhost:3000/
import ListaDeLibros from './components/ListaDeLibros';
import CrearPersona from "./components/CrearPersona";
import CrearCategoria from "./components/CrearCategorias";
import CrearLibros from "./components/CrearLibro";


function App() {
  return (
    <BrowserRouter>
          <Navegador/>
          <Route path="/edit/persona" component={CrearPersona}/>
          <Route path="/edit/libro" component={CrearLibro}/>
          <Route path="/user" component={ListaDePersonas}/>
          <Route path="/categoria" component={ListaDeCategorias}/>
          <Route path="/libro" component={ListaDeLibros}/> 


          <Switch>
            {/* LIBROS */}
            <Route path="/libro/crear">
              <CrearLibros />
            </Route>
            
            <Route path="/libro">
              <ListaDeLibros />
            </Route>
            {/* PERSONAS */}
            <Route path="/persona/">
              <CrearPersona />
            </Route>
  
            <Route path="/persona/:id">
              <unaPersona />
            </Route>
            <Route path="/persona">
              <ListaDePersonas />
            </Route>
            {/* CATEGORIAS */}
            <Route path="/categoria">
              <CrearCategoria />
            </Route>
            
            <Route path="/categoria/:id">
              <unGenero />
            </Route>
            <Route path="/categoria">
              <ListaDeCategorias />
            </Route>
            {/* ROOT */}
            <Route path="/">
              <ListaDeLibros />
            </Route>
          </Switch>

    </BrowserRouter>
  );
}


export default App;
