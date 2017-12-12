import {
  selectContractStateByAddress,
  selectContractByAddressFromState
} from './contracts';
import {
  selectUserTypeFromState
} from './user';
import {
  currentContractStateActions
} from 'utils/contract-states-config';

export const selectContractStateActionsForContract = (state, address) => {
  const userType = selectUserTypeFromState(state);
  const contractState = selectContractStateByAddress(state, address);
  const contract = selectContractByAddressFromState(state, address);
  const allActions = currentContractStateActions[contractState];
  return !!allActions && allActions.length
    ? allActions.filter(actionObject =>
      !!actionObject.condition
        ? actionObject.condition({
          userType,
          contract
        })
        : true)
    : [];
};
