import { BUSCAR_SUSCRIPTOR } from '../actions/types';

const initialState = {};

export default function(state = initialState, action){
  switch(action.type) {
    case BUSCAR_SUSCRIPTOR: {
      return {
        ...state,
        suscriptor: action.payload,
      };
    }
    default: 
      return state;
  }
}