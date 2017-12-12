import * as types from '../actions/types';
import { combineReducers } from 'redux';
import {
  NULL_USER_TYPE,
  BUYER_USER_TYPE,
  SELLER_USER_TYPE
} from '../utils/constants';

const initialUserState = NULL_USER_TYPE;
const initialAddressState = '';

const userType = (state = initialUserState, action) => {
  switch (action.type) {
    case types.BUYER_LOGIN:
      return BUYER_USER_TYPE;
    case types.SELLER_LOGIN:
      return SELLER_USER_TYPE;
    default:
      return state;
  }
};

const address = (state = initialAddressState, action) => {
  switch (action.type) {
    case types.ADD_USER_ADDRESS:
      return action.data;
    default:
      return state;
  }
};

const user = combineReducers({
  userType,
  address
});

export default user;
