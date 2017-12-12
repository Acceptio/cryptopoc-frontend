import React from 'react';
import PropTypes from 'prop-types';

import { Button, Grid, Row, Col, Panel } from 'react-bootstrap';

const title = <h2>Who you are?</h2>;

const Login = ({
  onLoginSellerClick,
  onLoginBuyerClick
}) => (
  <Grid>
    <Row
      bsClass='ap-mt-50'
    >
      <Col sm={ 12 } md={ 2 } mdOffset={ 5 }>
        <Panel header={ title }>
          <Button onClick={ onLoginBuyerClick }>Buyer</Button>
          <Button onClick={ onLoginSellerClick } bsClass='btn btn-default pull-right'>Seller</Button>
        </Panel>
      </Col>
    </Row>
  </Grid>
);

Login.propTypes = {
  onLoginSellerClick: PropTypes.func.isRequired,
  onLoginBuyerClick: PropTypes.func.isRequired
};

export default Login;
