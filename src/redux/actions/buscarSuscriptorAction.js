import { BUSCAR_SUSCRIPTOR } from './types';

export const buscarSuscriptor = suscriptor => {
  console.log(suscriptor);
  return {
    type: BUSCAR_SUSCRIPTOR,
    payload: suscriptor
  };
}