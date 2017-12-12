import { arrayFromHash } from './utils';
import {
  SELLER_USER_TYPE,
  BUYER_USER_TYPE
} from 'utils/constants';
import { selectUserTypeFromState } from './user';

export const selectContractsFromState = state => state.contracts;

export const selectContractByAddressFromState = (state, address) => selectContractsFromState(state)[address];

export const selectContractStateByAddress = (state, address) => selectContractByAddressFromState(state, address).contractState;

export const selectContractsAsArrayFromState = state => arrayFromHash(
  selectContractsFromState(
    state
  )
);

export const selectContractAddressesFromState = state => selectContractsAsArrayFromState(state).map(({ address }) => address);

export const selectHasContractsFromState = state => !!selectContractsAsArrayFromState(
  state
).length;

export const selectCounterPartyPropNameFromState = state => {
  const userType = selectUserTypeFromState(state);
  let toReturn;
  if (userType === SELLER_USER_TYPE) {
    toReturn = BUYER_USER_TYPE;
  } else {
    toReturn = SELLER_USER_TYPE;
  }
  return toReturn;
};
