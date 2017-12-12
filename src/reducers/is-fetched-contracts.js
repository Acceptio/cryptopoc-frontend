import boolReducerFactory from '../utils/bool-reducer-factory';
import * as types from '../actions/types';

export default boolReducerFactory(
  types.LOAD_CONTRACTS_SUCCESS,
  types.RESET_LOAD_CONTRACTS_SUCCESS
);
