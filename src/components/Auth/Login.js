import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleOnChange = ({target}) => {
    const { name, value } = target;
    this.setState({
      [name]: value 
    });
  }

  iniciarSesion = e => {
    e.preventDefault();
    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase.login({
      email,
      password
    }).then(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ha Iniciado Session!',
        showConfirmButton: false,
        timer: 1500
      });
    }).catch(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al Iniciar Session!',
        showConfirmButton: false,
        timer: 1500
      });
    });

  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center py-4">
                <i className="fas fa-lock"></i> Iniciar Session
              </h2>

              <form onSubmit={this.iniciarSesion}>
                <div className="form-group">
                  <label>Email:</label>
                  <input 
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>password:</label>
                  <input 
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={this.handleOnChange}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="btn btn-success btn-block">
                    Iniciar Session
                </button>
              </form>
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);