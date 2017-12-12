import React from 'react';
import PropTypes from 'prop-types';
import ContractsTableRow from 'containers/ContractsTableRow';
import { Table } from 'react-bootstrap';

const ContractsTable = ({
  contractAddresses,
  counterPartyPropName
}) => (
  <Table responsive striped bordered condensed hover>
    <thead>
      <tr>
        <th className='text-center'>Contract Name</th>
        <th className='text-center'>Date Start</th>
        <th className='text-center'>Date End</th>
        <th className='text-center'>Counter Party</th>
        <th className='text-center'>Status</th>
        <th className='text-center'>Actions</th>
      </tr>
    </thead>
    <tbody>
      { contractAddresses.map(address => (
        <ContractsTableRow
          key={ address }
          address={ address }
          counterPartyPropName={ counterPartyPropName }
        />
      ))}
    </tbody>
  </Table>
);

ContractsTable.propTypes = {
  contractAddresses: PropTypes.array.isRequired,
  counterPartyPropName: PropTypes.string.isRequired
};

export default ContractsTable;
