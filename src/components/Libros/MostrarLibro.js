import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spiner/Spiner';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

class MostrarLibro extends Component {

  devolverLibro = cod => {
    const { firestore, libro } = this.props;
    const prestados = libro.prestados.filter(prestado => prestado.codigo !== cod);
    libro.prestados = prestados;
    firestore.update({
      collection: 'libros',
      doc: libro.id
    }, libro).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Libro devuelto con exito!',
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

  render() {
    const { libro } = this.props;
    if(!libro) return <Spinner />
    const { id, titulo, editorial, ISBN, existencia, prestados } = libro;
    const disponibles = existencia - prestados.length;
    return (
      <div className="row">
        <div className="col-md-6 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-md-6 mb-4">
          <Link to={`/libros/editar/${id}`} className="btn btn-primary float-sm-rigth">
            <i className="fas fa-pencil-alt"></i> Editar Libro
          </Link>
        </div>

        <hr className="mx-5 w-100"/>

        <div className="col-12">
          <h2 className="mb-4">{ titulo }</h2>
          <p>
            <span className="font-weight-bold">ISBN:</span> { ISBN }
          </p>
          <p>
            <span className="font-weight-bold">Editorial:</span> { editorial }
          </p>
          <p>
            <span className="font-weight-bold">Existencia:</span> { existencia }
          </p>
          <p>
            <span className="font-weight-bold">Disponibles:</span> { disponibles }
          </p>

          {
            disponibles > 0 &&
              <Link to={`/libros/prestamo/${id}`} className="btn btn-success my-3">
                Solicitar Prestamo
              </Link>
          }

          {
            prestados.length > 0 ?
            <>
              <h3 className="my-2">Personas que tienen el libro Prestado</h3>
              {
                prestados.map(prestado => (
                  <div key={prestado.id} className="card my-2">
                    <h4 className="card-header">{ prestado.nombre } { prestado.apellido }</h4>
                    <div className="card-body">
                      <p>
                        <span className="font-weight-bold">Código:</span> { prestado.codigo }
                      </p>
                      <p>
                        <span className="font-weight-bold">Carrera:</span> { prestado.carrera }
                      </p>
                      <p>
                        <span className="font-weight-bold">Fecha de Solicitud:</span> { prestado.fecha_solicitud }
                      </p>
                    </div>
                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn btn-success font-weight-bold"
                        onClick={() => this.devolverLibro(prestado.codigo)}>
                        Realizar Devolución
                      </button>
                    </div>
                  </div>
                ))

              }
            </>

            : null
          }
        </div>

      </div>
    );
  }
}
 
MostrarLibro.propsTypes = {
  firestore: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect(props => [
    {
      collection: 'libros',
      storeAs: 'libro', // ALIAS PARA RENOMBRAR EN VEZ DE << SUSCRIPTORES >>
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0] // ALIAS PARA PASAR POR PROPS
  }))
)(MostrarLibro) ;