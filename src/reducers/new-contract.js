import * as types from '../actions/types';
import { combineReducers } from 'redux';

const termsInitialState = '';
const startDateInitialState = new Date();
const endDateInitialState = new Date();

const endDate = (state = endDateInitialState, action) => {
  switch (action.type) {
    case types.RESET_NEW_CONTRACT:
      return endDateInitialState;
    case types.SET_NEW_CONTRACT_END_DATE:
      return action.data;
    default:
      return state;
  }
};

const startDate = (state = startDateInitialState, action) => {
  switch (action.type) {
    case types.RESET_NEW_CONTRACT:
      return startDateInitialState;
    case types.SET_NEW_CONTRACT_START_DATE:
      return action.data;
    default:
      return state;
  }
};

const terms = (state = termsInitialState, action) => {
  switch (action.type) {
    case types.RESET_NEW_CONTRACT:
      return termsInitialState;
    case types.SET_NEW_CONTRACT_TERMS:
      return action.data;
    default:
      return state;
  }
};

const newContract = combineReducers({
  terms,
  startDate,
  endDate
});

export default newContract;
