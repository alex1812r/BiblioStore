import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

class NuevoSuscriptor extends Component {
  state = {
    nombre: '',
    apellido: '',
    carrera: '',
    codigo: ''
  }

  handleOnChange = ({target}) => {
    const { name, value } = target;
    this.setState({
      [name]: value 
    });
  }

  agregarSuscriptor = e => {
    e.preventDefault();
    const nuevoSuscriptor = {...this.state};
    // AGREGAR SUSCRIPTOR A LA BASE DE DATOS DE FIRESTORE
    const { firestore, history } = this.props;
    firestore.add({ collection: 'suscriptores' }, nuevoSuscriptor)
    .then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Suscriptor Registrado con exito!',
        showConfirmButton: false,
        timer: 1500
      });
      history.push('/suscriptores');
    });

  }

  render() {
    const { nombre, apellido, carrera, codigo } = this.state;
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/suscriptores" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user-plus"></i> Nuevo Suscriptor
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.agregarSuscriptor}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Nombre del Suscriptor"
                    value={nombre}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellido:</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="apellido"
                    placeholder="Apellido del Suscriptor"
                    value={apellido}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Carrera:</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="carrera"
                    placeholder="Carrera del Suscriptor"
                    value={carrera}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Código:</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="codigo"
                    placeholder="Codigo del Suscriptor"
                    value={codigo}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success">
                    Agregar Suscriptor
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NuevoSuscriptor.propTypes = {
  firestore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default firestoreConnect()(NuevoSuscriptor);
