import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spiner/Spiner';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import FichaSuscriptor from '../Suscritores/FichaSuscriptor';
import { buscarSuscriptor } from '../../redux/actions/buscarSuscriptorAction';

class PrestamoLibro extends Component {
  state = {
    busqueda: '',
    cargando: false,
  }

  handleOnChange = ({target}) => {
    const { name, value } = target;
    this.setState({
      [name]: value 
    });
  }

  buscarAlumno = e => {
    e.preventDefault();
    this.setState({
      cargando: true,
    });

    const { busqueda } = this.state;
    const { firestore, buscarSuscriptor } = this.props;
    const collection = firestore.collection('suscriptores');
    const consulta = collection.where("codigo", "==", busqueda).get();
    consulta.then(resultado => {
      
      if(resultado.empty) {
        buscarSuscriptor({});
      } else {
        const datos = resultado.docs[0];  
        buscarSuscriptor(datos.data());
      }

      this.setState({
        cargando: false,
      });
    });
  }
  
  solicitarPrestamo = () => {
    const { suscriptor } = this.props;
    suscriptor.fecha_solicitud = new Date().toLocaleDateString();
    
    const { firestore, libro, history } = this.props;
    libro.prestados.push(suscriptor);
    
    firestore.update({
      collection: 'libros',
      doc: libro.id
    }, libro).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Prestamo realizado con exito!',
        showConfirmButton: false,
        timer: 1500
      });
      history.push('/');
    })
  }

  render() {
    const { libro, suscriptor } = this.props;
    if(!libro) return <Spinner />
    
    const { titulo } = libro;
    const { cargando } = this.state;
    console.log('suscriptor :', suscriptor);
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i> Solicitar Prestamo: { titulo }
          </h2>
          <div className="row justify-content-center mt-5">
            <div className="col-md-8">
              <form onSubmit={this.buscarAlumno} className="mb-4">
                <legend className="color-primary text-center">
                  Busca el suscriptor por Código
                </legend>
                <div className="form-group">
                  <input 
                    type="text"
                    name="busqueda"
                    className="form-control"
                    onChange={this.handleOnChange}
                    value={this.busqueda}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-block">
                    Buscar Alumno
                </button>
              </form>
              {
                cargando ?
                  <Spinner />
                :
                  (Object.keys(suscriptor).length) ?
                    <>
                    <FichaSuscriptor />
                    <button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={this.solicitarPrestamo}>
                        Soliciar Prestamo
                    </button>
                    </>
                  : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PrestamoLibro.propTypes = {
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
  connect(({ firestore: { ordered }, suscriptor }, props) => ({
    libro: ordered.libro && ordered.libro[0], // ALIAS PARA PASAR POR PROPS
    suscriptor
  }),{ buscarSuscriptor })
)(PrestamoLibro);