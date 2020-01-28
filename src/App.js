import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// REDUX
import store from './redux/store';
import { Provider } from 'react-redux';
// LAYOUT
import Navbar from './components/Layout/Navbar';
// ROUTES COMPONENTS

// LIBROS
import Libros from './components/Libros/Libros';
import MostrarLibro from './components/Libros/MostrarLibro';
import NuevoLibro from './components/Libros/NuevoLibro';
import EditarLibro from './components/Libros/EditarLibro';
import PrestamoLibro from './components/Libros/PrestamoLibro';

// SUSCRIPTORES
import Suscriptores from './components/Suscritores/Suscriptores';
import MostrarSuscriptor from './components/Suscritores/MostrarSuscriptor';
import NuevoSuscriptor from './components/Suscritores/NuevoSuscriptor';
import EditarSuscriptor from './components/Suscritores/EditarSuscriptor';

import Login from './components/Auth/Login';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={UserIsAuthenticated(Libros)} />
            <Route exact path="/libros/mostrar/:id" component={UserIsAuthenticated(MostrarLibro)} />
            <Route exact path="/libros/nuevo" component={UserIsAuthenticated(NuevoLibro)} />
            <Route exact path="/libros/editar/:id" component={UserIsAuthenticated(EditarLibro)} />
            <Route exact path="/libros/prestamo/:id" component={PrestamoLibro} />
            
            <Route exact path="/suscriptores" component={UserIsAuthenticated(Suscriptores)} />
            <Route exact path="/suscriptores/nuevo" component={UserIsAuthenticated(NuevoSuscriptor)} />
            <Route exact path="/suscriptores/mostrar/:id" component={UserIsAuthenticated(MostrarSuscriptor)} />
            <Route exact path="/suscriptores/editar/:id" component={UserIsAuthenticated(EditarSuscriptor)} />

            <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
