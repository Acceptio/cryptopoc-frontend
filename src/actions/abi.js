import { payloadActionCreator } from '../utils/action-creator-factory';
import * as types from './types';

export const addContractAbi = payloadActionCreator(
  types.ADD_CONTRACT_ABI
);
