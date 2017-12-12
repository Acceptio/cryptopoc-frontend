import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import web3 from './web3Reducer';
import isFetchedContracts from './is-fetched-contracts';
import newContract from './new-contract';
import contracts from './contracts';
import abi from './abi';
import keystore from './keystore';
import temporaryKey from './temporary-key';
import isTemporaryKeyValid from './is-temporary-key-valid';
import isContractChangingState from './is-contract-changing-state';

const reducer = combineReducers({
  routing,
  user,
  web3,
  isFetchedContracts,
  newContract,
  contracts,
  abi,
  keystore,
  temporaryKey,
  isTemporaryKeyValid,
  isContractChangingState
});

export default reducer;
