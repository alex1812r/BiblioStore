import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spiner/Spiner';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';

class EditarLibro extends Component {
  
  tituloRef = React.createRef('');
  ISBNRef = React.createRef('');
  editorialRef = React.createRef('');
  existenciaRef = React.createRef('');

  editarLibro = e => {
    e.preventDefault();
    const libroEditado =  {
      titulo: this.tituloRef.current.value,
      ISBN: this.ISBNRef.current.value,
      editorial: this.editorialRef.current.value,
      existencia: this.existenciaRef.current.value
    };
    // AGREGAR LIBRO A LA BASE DE DATOS DE FIRESTORE
    const { firestore, libro, history } = this.props;
    firestore.update({
      collection: 'libros',
      doc: libro.id
    }, libroEditado)
    .then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Libro Editado con exito!',
        showConfirmButton: false,
        timer: 1500
      });
      history.push('/');
    });

  }

  render() {
    const { libro } = this.props;
    if(!libro) return <Spinner />
    const { titulo, ISBN, editorial, existencia } = libro;
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i> Editar Libro
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              
              <form onSubmit={this.editarLibro}>
                <div className="form-group">
                  <label>Titulo: </label>
                  <input 
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Titulo o Nombre de Libro"
                    defaultValue={titulo}
                    ref={this.tituloRef}
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
                    defaultValue={editorial}
                    ref={this.editorialRef}
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
                    defaultValue={ISBN}
                    ref={this.ISBNRef}
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
                    defaultValue={existencia}
                    ref={this.existenciaRef}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="btn btn-success"
                  >
                    Editar Libro
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
EditarLibro.propTypes = {
  firestore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: 'libros',
      storeAs: 'libro', // ALIAS PARA RENOMBRAR EN VEZ DE << LIBROS >>
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0] // ALIAS PARA PASAR POR PROPS
  }))
)(EditarLibro);
