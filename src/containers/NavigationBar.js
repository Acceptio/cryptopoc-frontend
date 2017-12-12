import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { INDEX_PATH } from 'routes';
import NavigationBarComponent from 'components/NavigationBar';
import { selectIsLogoutLocation } from 'selectors/location';
import { selectUserTypeFromState } from 'selectors/user';

const mapStateToProps = state => ({
  isLogoutLocation: selectIsLogoutLocation(state),
  userType: selectUserTypeFromState(state)
});

const mapDispatchToProps = {
  onLogout: () => push(INDEX_PATH)
};

const NavigationBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBarComponent);

export default NavigationBarContainer;
