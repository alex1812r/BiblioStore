import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// CUSTOM REDUCER
import buscarSuscriptorReducer from './reducers/buscarSuscriptorReducer';

// CONFIGURAR FIRESTORE
const firebaseConfig = {
  apiKey: "AIzaSyDyFpRJ7myJCrIXrg_x6KFgko0gIewu8KY",
  authDomain: "bibliostore-7420d.firebaseapp.com",
  databaseURL: "https://bibliostore-7420d.firebaseio.com",
  projectId: "bibliostore-7420d",
  storageBucket: "bibliostore-7420d.appspot.com",
  messagingSenderId: "624509270334",
  appId: "1:624509270334:web:354a0b1910ddf66d65d46f",
  measurementId: "G-SV583EGZ1H"  
};

// INICIALIZAR FIREBASE
firebase.initializeApp(firebaseConfig);

// CONFIGURACION DE REACT-REDUX
const  rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

// CREAR EL ENHANCER CON << compose >> DE REDUX Y FIRESTORE
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// REDUCERS
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  suscriptor: buscarSuscriptorReducer,

});

// STATE INICIAL
const initialState = {

};

// CREAR STORE
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;