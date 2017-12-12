import * as types from 'actions/types';

const initialState = null;

const keystore = (state = initialState, action) => {
  switch(action.type) {
    case types.ADD_KEYSTORE:
      return action.data;
    default:
      return state;
  }
};

export default keystore;
