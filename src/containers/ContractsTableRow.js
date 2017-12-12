import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContractsTableRowComponent from 'components/ContractsTableRow';
import { selectContractByAddressFromState } from 'selectors/contracts';
import { selectContractStateActionsForContract } from 'selectors/contract-state';
import { selectKeyStoreFromState } from '../selectors/keystore';
import { selectUserAddressFromState } from '../selectors/user';
import { selectAbiFromState } from '../selectors/abi';
import {selectIsContractStateChangingByAddress} from '../selectors/is-contract-changing-state';

const mapStateToProps = (state, { address, counterPartyPropName }) => ({
  counterPartyPropName,
  contract: selectContractByAddressFromState(state, address),
  actions: selectContractStateActionsForContract(state, address),
  userAddress: selectUserAddressFromState(state),
  abi: selectAbiFromState(state),
  keystore: selectKeyStoreFromState(state),
  isRowLoading: selectIsContractStateChangingByAddress(state, address)
});

const mapDispatchToProps = (dispatch) => ({
  dispatcher: (func, ...args) => () => dispatch(
    func(
      ...args
    )
  )
});

const mergedProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  actions: stateProps.actions.map(actionObj => ({
    ...actionObj,
    action: dispatchProps.dispatcher(actionObj.action, {
      address: ownProps.address,
      abi: stateProps.abi,
      userAddress: stateProps.userAddress,
      keystore: stateProps.keystore
    })
  }))
});

const ContractsTableRowContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergedProps
)(ContractsTableRowComponent);

ContractsTableRowContainer.propTypes = {
  address: PropTypes.string.isRequired,
  counterPartyPropName: PropTypes.string.isRequired
};

export default ContractsTableRowContainer;
