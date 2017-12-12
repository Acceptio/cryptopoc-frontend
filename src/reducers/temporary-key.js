import * as types from 'actions/types';

const temporaryKey = (state = '', action) => {
  switch (action.type) {
    case types.SET_TEMPORARY_PRIVATE_KEY:
      return action.data;
    case types.RESET_TEMPORARY_PRIVATE_KEY:
      return '';
    default:
      return state;
  }
};

export default temporaryKey;
