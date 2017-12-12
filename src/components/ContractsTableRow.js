import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, Label } from 'react-bootstrap';
import { BarLoader	} from 'react-spinners';

const loaderColor = '#C99D66';

const ContractsTableRow = ({
  contract,
  counterPartyPropName,
  actions,
  isRowLoading
}) => (
  <tr>
    <td>{ contract.terms }</td>
    <td className='text-center'>{ moment(contract.startDate).format('DD-MM-YY') }</td>
    <td className='text-center'>{ moment(contract.endDate).format('DD-MM-YY') }</td>
    <td className='text-center'>{ contract[counterPartyPropName] }</td>
    <td className='text-center'>
      { !!isRowLoading ? (
        <BarLoader
          color={ loaderColor }
          height={ 10 }
          className='margin-auto'
        />
      ) : (
        <Label>{ contract.contractState }</Label>
      ) }
    </td>
    <td>{ !!isRowLoading ? (
      <BarLoader
        color={ loaderColor }
        height={ 10 }
        className='margin-auto'
      />
    ) : actions.map(actionObj => actionObj.isText ?
      (
        <span
          key={ actionObj.label }
        >{ actionObj.label }</span>
      ) :
      (
        <Button
          key={ actionObj.label }
          onClick={ actionObj.action }
        >{ actionObj.label }</Button>
      )
    ) }</td>
  </tr>
);


ContractsTableRow.propTypes = {
  contract: PropTypes.object.isRequired,
  counterPartyPropName: PropTypes.string.isRequired,
  actions: PropTypes.array.isRequired,
  isRowLoading: PropTypes.bool.isRequired
};

export default ContractsTableRow;
