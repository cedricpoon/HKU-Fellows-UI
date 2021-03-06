import React, { Component } from 'react';
import { Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Form, Item, Label, Input, Text, Button, Icon, View, Spinner } from 'native-base';
import PropTypes from 'prop-types';

import Logo from '../Logo/Logo';
import Backdrop from '../Backdrop/Backdrop';

import { LOGO_SIZE } from './Constants';
import styles from './Styles';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { validity: { username: true, password: true } };
  }

  _setValidity = (name, isValid, more = {}) => {
    this.setState(prevState => ({
      ...more,
      validity: {
        ...prevState.validity,
        [name]: isValid
      }
    }));
  }

  _validate = () => {
    const { onLogin, alert } = this.props;
    const { username, password } = this.state;

    Keyboard.dismiss();

    let valid = true;
    if (!username) {
      this._setValidity('username', false);
      valid = false;
    }
    if (!password) {
      this._setValidity('password', false);
      valid = false;
    }
    if (valid) {
      onLogin({ username, password });
    } else {
      alert(locale['login.missingParam']);
    }
  }

  _handleChangeWrapper = (name) => {
    return (newValue) => {
      this._setValidity(name, true, { [name]: newValue });
    }
  }

  render() {
    const { validity } = this.state;
    const { loggingIn } = this.props;

    return (
      <KeyboardAvoidingView style={styles.fullPageContainer} behavior="padding" enabled>
        <View style={styles.inputForm}>
          <Logo size={LOGO_SIZE} />
          <Form style={styles.fullWidth}>
            <Item floatingLabel error={!validity.username}>
              <Label><Text note style={styles.placeholder}>{locale['login.username']}</Text></Label>
              <Input
                autoCorrect={false}
                autoCapitalize = 'none'
                keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
                onChangeText={this._handleChangeWrapper('username')}
              />
              {!validity.username &&
                <Icon name='exclamationcircleo' type='AntDesign' />
              }
            </Item>
            <Item floatingLabel error={!validity.password}>
              <Label><Text note style={styles.placeholder}>{locale['login.password']}</Text></Label>
              <Input
                secureTextEntry
                onChangeText={this._handleChangeWrapper('password')}
              />
              {!validity.password &&
                <Icon name='exclamationcircleo' type='AntDesign' />
              }
            </Item>
            <Item style={styles.noBorderItem}>
              <Label>
                <Text style={[styles.declaration, styles.placeholder]}>
                  {locale['login.declaration']}
                </Text>
              </Label>
            </Item>
          </Form>
          { loggingIn ? (
            <Spinner style={styles.submit} inverse size='small' />
          ) : (
            <Button block iconRight transparent dark
              style={styles.submit}
              onPress={this._validate}
              disabled={loggingIn}
            >
              <Text>{locale['login.button']}</Text>
              <Icon name='login' type='AntDesign' />
            </Button>
          ) }
        </View>
        <Backdrop style={styles.backdrop} />
      </KeyboardAvoidingView>
    );
  }
}

LoginForm.propTypes = {
  alert: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool
}

export default LoginForm;
