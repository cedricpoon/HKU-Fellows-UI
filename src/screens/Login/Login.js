import React, { Component } from 'react';
import { Platform, Image, Dimensions } from 'react-native';
import { Container, Form, Item, Label, Input, Text, Button, Icon, View } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import background from './background';
import styles from './Styles';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

export class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const deviceHeight = Dimensions.get('window').height;
    const deviceWidth = Dimensions.get('window').width;

    return (
      <Container style={styles.fullPageContainer}>
        <View style={styles.inputForm}>
          <Form>
            <Item floatingLabel>
              <Label><Text note style={styles.placeholder}>{locale['login.username']}</Text></Label>
              <Input
                autoCorrect={false}
                keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'}
              />
            </Item>
            <Item floatingLabel error>
              <Label><Text note style={styles.placeholder}>{locale['login.password']}</Text></Label>
              <Input secureTextEntry />
              <Icon name='exclamationcircleo' type='AntDesign' />
            </Item>
            <Item style={styles.noBorderItem}>
              <Label>
                <Text style={[styles.declaration, styles.placeholder]}>
                  {locale['login.declaration']}
                </Text>
              </Label>
            </Item>
          </Form>
          <Button block iconRight transparent dark style={styles.submit}>
            <Text>{locale['login.button']}</Text>
            <Icon name='login' type='AntDesign' />
          </Button>
        </View>
        <Image
          source={{uri: background}}
          style={[
            { width: deviceWidth, height: deviceHeight },
            styles.backdrop
          ]}
          resizeMode='repeat'
        />
      </Container>
    );
  }
}

Login.propTypes = {

}

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({

})

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
