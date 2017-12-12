import * as types from 'actions/types';

const initialState = [];

const isContractChangingState = (state = initialState, action) => {
  switch(action.type) {
    case types.CONTRACT_CHANGE_START:
      return state.concat(action.data);
    case types.CONTRACT_CHANGE_STOP:
      return [
        ...state.slice(0, state.indexOf(action.data)),
        ...state.slice(state.indexOf(action.data) + 1, state.length)
      ];
    default:
      return state;
  }
};

export default isContractChangingState;
