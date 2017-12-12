import React from 'react';
import PropTypes from 'prop-types';
import ContractsTable from './ContractsTable';
import { Grid, Row, Button, Alert, Col } from 'react-bootstrap';

const HomeComponent = ({
  onCreateNewContractClick,
  address,
  hasContracts,
  contractAddresses,
  counterPartyPropName,
  isAddressVerified,
  verifyAddress

}) => {
  let pageData;
  if (!isAddressVerified) {
    pageData = (<div>Please verify your address to see contracts</div>);
  } else {
    if (!hasContracts) {
      pageData = (<div>No contracts found. Create new one</div>);
    } else {
      pageData = (
        <ContractsTable
          contractAddresses={ contractAddresses }
          counterPartyPropName={ counterPartyPropName }
        />
      );
    }
  }

  return (
    <Grid>
      <Row>
        <Col sm={ 12 } md={ 6 } mdOffset={ 3 }>
          { !!isAddressVerified ?
            (<p>Account address <span className='ap-account'>{ address }</span></p>) :
            (<Alert
              bsStyle={ 'danger' }
              className='ap-mt-50'
            >
              <h4>Address not verified</h4>
              <p><Button
                bsClass='ap-verify'
                onClick={ verifyAddress }
                bsStyle={ 'danger' }
              >Verify &rarr;</Button> { address }</p>
            </Alert>)
          }
        </Col>
      </Row>
      <Row>
        <Col sm={ 12 }>
          <Button
            bsClass='ap-new-contract pull-right ap-mb-20'
            disabled={ !isAddressVerified }
            onClick={ onCreateNewContractClick }
          >Deploy new contract</Button>
        </Col>
      </Row>
      <Row>
        <Col sm={ 12 }>
          { pageData }
        </Col>
      </Row>
    </Grid>
  );
};

HomeComponent.propTypes = {
  address: PropTypes.string.isRequired,
  onCreateNewContractClick: PropTypes.func.isRequired,
  contractAddresses: PropTypes.array.isRequired,
  hasContracts: PropTypes.bool.isRequired,
  counterPartyPropName: PropTypes.string.isRequired,
  isAddressVerified: PropTypes.bool.isRequired,
  verifyAddress: PropTypes.func.isRequired
};

export default HomeComponent;
