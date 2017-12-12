import * as types from './types';

export const addUserAddress = data => ({
  type: types.ADD_USER_ADDRESS,
  data
});

export const addContractAddresses = data => ({
  type: types.ADD_CONTRACT_ADDRESSES,
  data
});
