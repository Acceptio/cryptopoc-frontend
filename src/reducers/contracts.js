import * as types from 'actions/types';

const initialState = {};

const contracts = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONTRACTS_DETAILS:
      return {
        ...state,
        ...action.data.reduce((acc, {
          address,
          details
        }) => ({
          ...acc,
          [address]: {
            ...details,
            address
          }
        }), {})
      };
    default:
      return state;
  }
};

export default contracts;
