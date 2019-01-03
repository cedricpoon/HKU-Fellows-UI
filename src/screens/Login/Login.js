import React, { Component } from 'react';
import { Container, Toast } from 'native-base';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { LoginForm } from 'hkufui/components';
import { localize } from 'hkufui/locale';
import { login } from 'hkufui/config/webapi';
import { onLogin, onClear } from './authenticate';
import { ALERT_DURATION } from './Constants';

const locale = localize({ language: 'en', country: 'hk' });

const alert = (message) => {
  Toast.show({
    text: message,
    buttonText: locale['toast.dismiss'],
    type: 'danger',
    duration: ALERT_DURATION
  });
}

const isAuthenticated = (credential) => credential && Object.keys(credential).length !== 0;

export class Login extends Component {
  constructor(props) {
    super(props);
    this._redirect = this._redirect.bind(this);
  }

  _redirect() {
    const { credential, navigation } = this.props;

    if (isAuthenticated(credential)) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Context' })],
      });
      navigation.dispatch(resetAction);
    }
  }

  componentDidMount() {
    if (!isAuthenticated(this.props.credential))
      this.props.onClearCredential();
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
  onClearCredential: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  credential: state.credential
});

const mapDispatchToProps = dispatch => ({
  onLogin: ({ username, password }) => { dispatch(
    onLogin({
      credential: { username, password },
      alert,
      path: login.password
    })
  )},
  onClearCredential: () => { dispatch(onClear()) }
})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
