import React, { Component } from 'react';
import { Container } from 'native-base';
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { LoginForm } from 'hkufui/components';
import { login } from 'hkufui/config/webapi';
import NavigationService from 'hkufui/src/NavigationService';
import { show3s } from 'hkufui/src/toastHelper.js';

import { onLogout } from 'hkufui/src/navigator/Context/DrawerMenu/drawerAction';
import { onLogin } from './authenticate';

const alert = (message) => { show3s({ message, type: 'danger' }); }
const isAuthenticated = (credential) => credential && Object.keys(credential).length !== 0;

export class Login extends Component {
  constructor(props) {
    super(props);
  }

  _redirect = () => {
    const { credential, navigation } = this.props;

    if (isAuthenticated(credential)) {
      NavigationService.reset('Context', null, navigation);
    }
  }

  componentDidMount() {
    if (!isAuthenticated(this.props.credential))
      this.props.onLogout();
    this._redirect();
  }

  componentDidUpdate() {
    this._redirect();
  }

  render() {
    const { onLogin, credential } = this.props;

    const loggingIn = credential && Object.keys(credential).length === 0;

    if (isAuthenticated(credential)) {
      // prevent displaying login screen
      return null;
    }

    return (
      <Container>
        <LoginForm
          alert={alert}
          onLogin={onLogin}
          loggingIn={loggingIn}
        />
      </Container>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  credential: PropTypes.object,
  onLogout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  credential: state.credential
});

const mapDispatchToProps = dispatch => ({
  onLogin: ({ username, password }) => { dispatch(
    onLogin({
      credential: { username, password },
      alert,
      path: login.password()
    })
  )},
  onLogout: () => { dispatch(onLogout()) }
})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
