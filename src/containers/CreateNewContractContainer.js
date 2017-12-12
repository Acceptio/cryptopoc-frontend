import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateNewContractComponent from '../components/CreateNewContract';
import { contract as contractActions } from '../actions';
import {
  selectNewContractStartDateFromState,
  selectNewContractEndDateFromState,
  selectNewContractTermsFromState
} from '../selectors/new-contract';
import wrapWithFunc from '../utils/wrap-with-func';

class CreateNewContractStateful extends Component {
  componentWillMount() {
    const { resetNewContract } = this.props;
    resetNewContract();
  }

  render() {
    return (<CreateNewContractComponent { ...this.props } />);
  }
}

CreateNewContractStateful.propTypes = {
  resetNewContract: PropTypes.func.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  terms: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  startDate: selectNewContractStartDateFromState(state),
  endDate: selectNewContractEndDateFromState(state),
  terms: selectNewContractTermsFromState(state)
});

const mapDispatchToProps = dispatch => ({
  ...wrapWithFunc(dispatch)({
    resetNewContract: contractActions.resetNewContract,
    setNewContractStartDate: contractActions.setNewContractStartDate,
    setNewContractEndDate: contractActions.setNewContractEndDate,
    setNewContractTerms: contractActions.setNewContractTerms
  }),
  deployNewContract: data => () => dispatch(
    contractActions.deployNewContract(
      data
    )
  )
});

const mergedProps = ({
  startDate,
  endDate,
  terms
}, dispatchProps) => ({
  startDate,
  endDate,
  terms,
  ...dispatchProps,
  deployNewContract: dispatchProps.deployNewContract({
    startDate,
    endDate,
    terms
  })
});

const CreateNewContractContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergedProps
)(CreateNewContractStateful);

export default CreateNewContractContainer;
