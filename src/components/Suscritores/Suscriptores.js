import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spiner/Spiner';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';

const Suscriptores = ({suscriptores, firestore, history}) => {
  
  if(!suscriptores) return <Spinner />

  const eliminarSuscriptor = idToDelete => {
     
    Swal.fire({
      title: '¿Esta Seguro?',
      text: "Los Suscriptores eliminados no se pueden recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        firestore.delete({
          collection: 'suscriptores',
          doc: idToDelete
        }).then(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Suscriptor Eliminado con exito',
            showConfirmButton: false,
            timer: 1500
          })  
          history.push('/suscriptores');
        });
      }
    })

    
  } 

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link 
          to="/suscriptores/nuevo"
          className="btn btn-primary">
            <i className="fas fa-plus"></i> Nuevo Suscriptor
        </Link>
      </div>
      <div className="col-md-8">
        <h2><i className="fas fa-users"></i> Suscriptores</h2>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            suscriptores.length
            ?
              suscriptores.map((suscriptor, index) => (
                <tr key={suscriptor.id}>
                  <td>{ suscriptor.nombre } { suscriptor.apellido }</td>
                  <td>{ suscriptor.carrera }</td>
                  <td>
                    <Link 
                      to={`/suscriptores/mostrar/${suscriptor.id}`}
                      className="btn btn-success btn-block">
                        <i className="fas fa-angle-double-right"></i> Mas Información
                    </Link>
                    <button 
                      type="button" 
                      className="btn btn-danger btn-block"
                      onClick={() => eliminarSuscriptor(suscriptor.id)}>
                      <i className="fas fa-trash-alt"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))

            : 
              <tr>
                <td colSpan="3">
                  <p className="text-center my-4">No hay Suscriptores registrados</p>
                </td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  );
}
 
Suscriptores.propTypes = {
  firestore: PropTypes.object.isRequired,
  suscriptores: PropTypes.array.isRequired,
}

export default compose(
  firestoreConnect([{ collection: 'suscriptores' }]),
  connect((state) => ({
    suscriptores: state.firestore.ordered.suscriptores 
  }))
)(Suscriptores) ;