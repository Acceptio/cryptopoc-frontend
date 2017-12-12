import React from 'react';
import PropTypes from 'prop-types';
import NavigationBarContainer from './NavigationBar';

const NavigationBarWrapperComponent = ({ match, Component }) => (
  <NavigationBarContainer match={ match }>
    <Component match={ match }/>
  </NavigationBarContainer>
);

NavigationBarWrapperComponent.propTypes = {
  match: PropTypes.object.isRequired,
  Component: PropTypes.element.isRequired
};

const NavigationBarWrapper = (Component) => ({ match }) => NavigationBarWrapperComponent({ match, Component });

export default NavigationBarWrapper;
