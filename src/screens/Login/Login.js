import React, { Component } from 'react';
import { Container, Toast } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { LoginForm } from 'hkufui/components';
import { localize } from 'hkufui/locale';
import { onLogin } from './authenticate';
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

export class Login extends Component {
  constructor(props) {
    super(props);
    this._redirect = this._redirect.bind(this);
  }

  _redirect() {
    const { credential, navigation } = this.props;

    const loggedIn = credential && Object.keys(credential).length !== 0;
    // logged in page redirection
    if (loggedIn) {
      navigation.navigate('Context');
    }
  }

  componentDidMount() {
    this._redirect();
  }

  componentDidUpdate() {
    this._redirect();
  }

  render() {
    const { onLogin, credential } = this.props;

    const loggingIn = credential && Object.keys(credential).length === 0;

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
  credential: PropTypes.object
}

const mapStateToProps = state => ({
  credential: state.credential
});

const mapDispatchToProps = dispatch => ({
  onLogin: ({ username, password }) => {dispatch(
    onLogin(
      { username, password },
      alert
    )
  )}
})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
