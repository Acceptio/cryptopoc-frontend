import { connect } from 'react-redux';
import Login from '../components/Login';
import { login as loginActions } from '../actions/index';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onLoginSellerClick: loginActions.loginSeller,
  onLoginBuyerClick: loginActions.loginBuyer
};

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginButtonContainer;

