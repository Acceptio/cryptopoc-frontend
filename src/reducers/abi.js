import * as types from 'actions/types';

const initialState = null;

const abi = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONTRACT_ABI:
      return action.data;
    default:
      return state;
  }
};

export default abi;
