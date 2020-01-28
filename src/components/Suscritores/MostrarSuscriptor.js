import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spiner/Spiner';
import PropTypes from 'prop-types';

const MostrarSuscriptor = ({ suscriptor }) => {
  
  if(!suscriptor) return <Spinner />
  
  return (
    <div className="row">
      <div className="col-sm-6 mb-4">
        <Link to="/suscriptores" className="btn btn-secondary">
          <i className="fas fa-arrow-circle-left"></i> Volver al Listado
        </Link>
      </div>
      <div className="col-sm-6">
        <Link 
          to={`/suscriptores/editar/${suscriptor.id}`}
          className="btn btn-primary float-sm-right">
            <i className="fas fa-pencil-alt"></i> Editar Suscriptor
        </Link>
      </div>
      <hr className="mx-5 w-100"/>
      <div className="col-12">
        <h2 className="mb-4">{ suscriptor.nombre } { suscriptor.apellido }</h2>
        <p>
          <span className="font-weight-bold">Carrera:</span> { suscriptor.carrera }
        </p>
        <p>
          <span className="font-weight-bold">Código:</span> { suscriptor.codigo }
        </p>
      </div>
    </div>
  );
}

MostrarSuscriptor.propsTypes = {
  firestore: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect(props => [
    {
      collection: 'suscriptores',
      storeAs: 'suscriptor', // ALIAS PARA RENOMBRAR EN VEZ DE << SUSCRIPTORES >>
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    suscriptor: ordered.suscriptor && ordered.suscriptor[0] // ALIAS PARA PASAR POR PROPS
  }))
)(MostrarSuscriptor) ;