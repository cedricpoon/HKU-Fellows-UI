import React, { Component } from 'react';
import { Platform, Image, Dimensions, Keyboard } from 'react-native';
import { Form, Item, Label, Input, Text, Button, Icon, View } from 'native-base';
import PropTypes from 'prop-types';

import background from './background';
import styles from './Styles';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { validity: { username: true, password: true } };
    this._setValidity = this._setValidity.bind(this);
    this._handleChangeWrapper = this._handleChangeWrapper.bind(this);
    this._validate = this._validate.bind(this);
  }

  _setValidity(name, isValid, more = {}) {
    this.setState(prevState => ({
      ...more,
      validity: {
        ...prevState.validity,
        [name]: isValid
      }
    }));
  }

  _validate() {
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

  _handleChangeWrapper(name) {
    return (newValue) => {
      this._setValidity(name, true, { [name]: newValue });
    }
  }

  render() {
    const { validity } = this.state;
    const { loggingIn } = this.props;

    const deviceHeight = Dimensions.get('window').height;
    const deviceWidth = Dimensions.get('window').width;

    return (
      <View style={styles.fullPageContainer}>
        <View style={styles.inputForm}>
          <Form>
            <Item floatingLabel error={!validity.username}>
              <Label><Text note style={styles.placeholder}>{locale['login.username']}</Text></Label>
              <Input
                autoCorrect={false}
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
          <Button block iconRight transparent dark
            style={styles.submit}
            onPressIn={this._validate}
            disabled={loggingIn}
          >
            <Text>{locale['login.button']}</Text>
            <Icon name='login' type='AntDesign' />
          </Button>
        </View>
        <Image
          source={{ uri: background }}
          style={[
            { width: deviceWidth, height: deviceHeight },
            styles.backdrop
          ]}
          resizeMode='repeat'
        />
      </View>
    );
  }
}

LoginForm.propTypes = {
  alert: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool
}

export default LoginForm;
