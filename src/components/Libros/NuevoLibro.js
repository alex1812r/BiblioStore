import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

class NuevoLibro extends Component {
  state = {
    titulo: '',
    ISBN: '',
    editorial: '',
    existencia: ''
  }

  handleOnChange = ({target}) => {
    const { name, value } = target;
    this.setState({
      [name]: value 
    });
  }

  agregarLibro = e => {
    e.preventDefault();
    const nuevoLibro = {...this.state};
    nuevoLibro.prestados = [];
    // AGREGAR LIBRO A LA BASE DE DATOS DE FIRESTORE
    const { firestore, history } = this.props;
    firestore.add({ collection: 'libros' }, nuevoLibro)
    .then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Libro Registrado con exito!',
        showConfirmButton: false,
        timer: 1500
      });
      history.push('/');
    });

  }

  render() {
    const { titulo, ISBN, editorial, existencia } = this.state;
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i> Nuevo Libro
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              
              <form onSubmit={this.agregarLibro}>
                <div className="form-group">
                  <label>Titulo: </label>
                  <input 
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Titulo o Nombre de Libro"
                    value={titulo}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Editorial: </label>
                  <input 
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial del Libro"
                    value={editorial}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ISBN: </label>
                  <input 
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="ISBN del Libro"
                    value={ISBN}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Existencia: </label>
                  <input 
                    type="number"
                    min="0"
                    className="form-control"
                    name="existencia"
                    placeholder="Cantidad en existencia del Libro"
                    value={existencia}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="btn btn-success"
                  >
                    Agregar Libro
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
NuevoLibro.propTypes = {
  firestore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default firestoreConnect()(NuevoLibro);