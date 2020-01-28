import React from 'react'
import { connect } from 'react-redux';


const FichaSuscriptor = ({ suscriptor }) => {
  console.log('suscriptor :', suscriptor);
  const { nombre, codigo, carrera } = suscriptor;
  return (
    <div className="card my-3">
      <h3 className="card-header bg-primary text-white">
        Datos del Solicitante
      </h3>
      <div className="card-body">
        <p className="font-weight-bold">Nombre: {' '}
          <span className="font-weight-normal">{ nombre }</span>
        </p>
        <p className="font-weight-bold">Código: {' '}
          <span className="font-weight-normal">{ codigo }</span>
        </p>
        <p className="font-weight-bold">Carrera: {' '}
          <span className="font-weight-normal">{ carrera }</span>
        </p>
      </div>
    </div>
  );
}
 
export default connect(state => ({ suscriptor: state.suscriptor.suscriptor }))(FichaSuscriptor);