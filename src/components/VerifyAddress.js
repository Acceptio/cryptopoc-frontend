import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  FormGroup,
  ControlLabel,
  Button,
  FormControl,
  Alert,
  Col,
  Form
} from 'react-bootstrap';

const privKeyId = 'private-key';

const VerifyAddressComponent = ({
  verifyPrivateKey,
  setNewPrivateKey,
  privateKey,
  isTemporaryKeyValid,
  address
}) => (
  <Grid>
    <Row bsClass='ap-mt-50'>
      <Col sm={ 12 } md={ 6 } mdOffset={ 3 }>
        <p className='ap-mb-20 ap-verify-address'><strong>Your associated address is </strong><span className='ap-account'>{ address }</span></p>
        <Form horizontal>
          <FormGroup controlId={ privKeyId }>
            <Col sm={ 3 }>
              <ControlLabel>{'Private key'}</ControlLabel>
            </Col>
            <Col sm={ 9 }>
              <FormControl
                bsClass='form-control ap-verify-key'
                placeholder={ 'Please paste your private key here' }
                type={ 'password' }
                id={ privKeyId }
                value={ privateKey }
                onChange={ e => setNewPrivateKey(e.target.value) }
              />
            </Col>
          </FormGroup>
        </Form>
        { !isTemporaryKeyValid ?
          (<Alert bsStyle={ 'danger' }>
            <h4>Key not valid</h4>
            <p>Please try again</p>
          </Alert>) : ''
        }
        <Button
          onClick={ verifyPrivateKey }
          bsClass='ap-new-contract pull-right ap-mb-20'
        >Verify
        </Button>
      </Col>
    </Row>
  </Grid>
);

VerifyAddressComponent.propTypes = {
  verifyPrivateKey: PropTypes.func.isRequired,
  privateKey: PropTypes.string.isRequired,
  setNewPrivateKey: PropTypes.func.isRequired,
  isTemporaryKeyValid: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired
};

export default VerifyAddressComponent;
