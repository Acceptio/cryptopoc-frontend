import boolReducerFactory from '../utils/bool-reducer-factory';
import * as types from '../actions/types';

export default boolReducerFactory(
  types.SET_TEMPORARY_PRIVATE_KEY,
  types.KEY_VERIFICATION_FAILED,
  true
);
