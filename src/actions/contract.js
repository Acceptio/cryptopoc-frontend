import * as types from './types';
import {
  payloadActionCreator,
  emptyActionCreator
} from 'utils/action-creator-factory';

export const loadContractsSuccess = emptyActionCreator(
  types.LOAD_CONTRACTS_SUCCESS
);
export const resetLoadContractsSuccess = emptyActionCreator(
  types.RESET_LOAD_CONTRACTS_SUCCESS
);
export const resetNewContract = emptyActionCreator(
  types.RESET_NEW_CONTRACT
);

export const setNewContractStartDate = payloadActionCreator(
  types.SET_NEW_CONTRACT_START_DATE
);

export const setNewContractEndDate = payloadActionCreator(
  types.SET_NEW_CONTRACT_END_DATE
);

export const setNewContractTerms = payloadActionCreator(
  types.SET_NEW_CONTRACT_TERMS
);

export const deployNewContract = payloadActionCreator(
  types.DEPLOY_NEW_CONTRACT
);

export const addContractsDetails = payloadActionCreator(types.ADD_CONTRACTS_DETAILS);
