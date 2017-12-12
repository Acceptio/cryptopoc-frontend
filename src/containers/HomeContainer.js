import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login as loginActions } from '../actions';
import {
  selectUserTypeFromState,
  selectUserAddressFromState
} from '../selectors/user';
import {
  selectHasContractsFromState,
  selectContractAddressesFromState,
  selectCounterPartyPropNameFromState
} from 'selectors/contracts';
import { selectIsFetchedContractsFromState } from '../selectors/is-fetched-contracts';
import { selectKeyStoreHasUserAddress } from 'selectors/keystore';
import {
  CREATE_NEW_CONTRACT_FULL_PATH,
  VERIFY_ADDRESS_FULL_PATH
} from '../routes';
import { push } from 'react-router-redux';

import HomeComponent from '../components/Home';
import wrapWithFunc from '../utils/wrap-with-func';

class StatefulHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownFetched: false
    };
  }

  componentWillMount() {
    const { onDashboardEnter } = this.props;
    onDashboardEnter();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.fetched && nextProps.fetched) {
      this.setState({
        ownFetched: true
      });
    }
  }

  render() {
    const { ownFetched } = this.state;
    let toReturn;
    if (ownFetched) {
      toReturn = (<HomeComponent { ...this.props } />);
    } else {
      toReturn = (<div>Loading...</div>);
    }
    return toReturn;
  }
}

StatefulHome.propTypes = {
  onDashboardEnter: PropTypes.func.isRequired,
  fetched: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  onCreateNewContractClick: PropTypes.func.isRequired,
  hasContracts: PropTypes.bool.isRequired,
  contractAddresses: PropTypes.array.isRequired,
  counterPartyPropName: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  hasContracts: selectHasContractsFromState(state),
  contractAddresses: selectContractAddressesFromState(state),
  userType: selectUserTypeFromState(state),
  fetched: selectIsFetchedContractsFromState(state),
  address: selectUserAddressFromState(state),
  isAddressVerified: selectKeyStoreHasUserAddress(state),
  counterPartyPropName: selectCounterPartyPropNameFromState(state)
});

const mapDispatchToProps = dispatch => ({
  onDashboardEnter: (userType) => () => dispatch(
    loginActions.onDashboardEnter(
      userType
    )
  ),
  ...wrapWithFunc(dispatch)({
    onCreateNewContractClick: () => push(
      CREATE_NEW_CONTRACT_FULL_PATH
    ),
    verifyAddress: () => push(
      VERIFY_ADDRESS_FULL_PATH
    )
  })
});

const mergedProps = ({
  userType,
  fetched,
  address,
  hasContracts,
  contractAddresses,
  counterPartyPropName,
  isAddressVerified
}, {
  onDashboardEnter,
  onCreateNewContractClick,
  verifyAddress
}) => ({
  onDashboardEnter: onDashboardEnter(userType),
  onCreateNewContractClick,
  verifyAddress,
  fetched,
  address,
  hasContracts,
  contractAddresses,
  counterPartyPropName,
  isAddressVerified
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergedProps
)(StatefulHome);

export default HomeContainer;
