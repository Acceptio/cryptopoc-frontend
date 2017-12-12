import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  FormGroup,
  ControlLabel,
  Button,
  FormControl,
  Col,
  Form
} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

const termsId = 'formControlsTerms';
const startDateId = 'formStartDate';
const endDateId = 'formStartDate';

const dateToString = date => date.toISOString();
const stringToDate = str => new Date(str);
const wrapDateOnChange = cb => value => cb(stringToDate(value));

const CreateNewContractComponent = ({
  startDate,
  endDate,
  terms,
  setNewContractStartDate,
  setNewContractEndDate,
  setNewContractTerms,
  deployNewContract
}) => (
  <Grid>
    <Row bsClass='ap-mt-50'>
      <Col sm={ 12 } md={ 6 } mdOffset={ 3 }>
        <Form>
          <FormGroup controlId={ termsId }>
            <ControlLabel>{'Terms'}</ControlLabel>
            <FormControl
              placeholder={ 'Enter Contract terms' }
              type={ 'text' }
              id={ termsId }
              value={ terms }
              onChange={ e => setNewContractTerms(e.target.value) }
            />
          </FormGroup>
        </Form>
        <Form>
          <Row>
            <Col sm={ 6 }>
              <FormGroup controlId={ startDateId }>
                <ControlLabel>{'Start Date'}</ControlLabel>
                <DatePicker
                  id={ startDateId }
                  value={ dateToString(startDate) }
                  onChange={ wrapDateOnChange(setNewContractStartDate) }
                />
              </FormGroup>
            </Col>
            <Col sm={ 6 }>
              <FormGroup controlId={ endDateId }>
                <ControlLabel>{'End Date'}</ControlLabel>
                <DatePicker
                  id={ endDateId }
                  value={ dateToString(endDate) }
                  onChange={ wrapDateOnChange(setNewContractEndDate) }
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Button onClick={ deployNewContract } bsClass='ap-new-contract pull-right ap-mt-20'>
          Deploy
        </Button>
      </Col>
    </Row>
  </Grid>
);

CreateNewContractComponent.propTypes = {
  terms: PropTypes.string.isRequired,
  setNewContractTerms: PropTypes.func.isRequired,
  setNewContractStartDate: PropTypes.func.isRequired,
  setNewContractEndDate: PropTypes.func.isRequired,
  deployNewContract: PropTypes.func.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object
};

export default CreateNewContractComponent;
