import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spiner/Spiner';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';

class EditarSuscriptor extends Component {

  nombreRef = React.createRef();
  apellidoRef = React.createRef();
  carreraRef = React.createRef();
  codigoRef = React.createRef();

  editarSuscriptor = e => {
    e.preventDefault();
    const suscriptorEditado = {
      nombre: this.nombreRef.current.value,
      apellido: this.apellidoRef.current.value,
      carrera: this.carreraRef.current.value,
      codigo: this.codigoRef.current.value,
    };
    const { history, suscriptor, firestore } = this.props;
    firestore.update({
      collection: 'suscriptores',
      doc: suscriptor.id
    }, suscriptorEditado).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Suscriptor Editado con exito!',
        showConfirmButton: false,
        timer: 1500
      });
      history.push('/suscriptores');
    });
  }

  render() {
    const { suscriptor } = this.props;
    if(!suscriptor) return <Spinner />
    const { nombre, apellido, carrera, codigo } = suscriptor;
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
              <form onSubmit={this.editarSuscriptor}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Nombre del Suscriptor"
                    ref={this.nombreRef}
                    defaultValue={nombre}
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
                    ref={this.apellidoRef}
                    defaultValue={apellido}
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
                    ref={this.carreraRef}
                    defaultValue={carrera}
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
                    ref={this.codigoRef}
                    defaultValue={codigo}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success">
                    Editar Suscriptor
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditarSuscriptor.propsTypes = {
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
)(EditarSuscriptor);
