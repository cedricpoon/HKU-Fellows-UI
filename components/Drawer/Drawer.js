import React, { PureComponent } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Button, Text } from 'native-base';
import { DrawerItems } from 'react-navigation';
import PropTypes from 'prop-types';

import styles from './Styles';
import { localize } from 'hkufui/locale';
import NavigationService from 'hkufui/src/NavigationService';

const locale = localize({ language: 'en', country: 'hk' });

export class Drawer extends PureComponent {
  constructor(props) {
    super(props);

    this._onLogout = this._onLogout.bind(this);
  }

  _onLogout() {
    const { onLogout } = this.props;
    onLogout();
    // navigate to login screen
    NavigationService.reset('Login');
  }

  render() {
    // following react-navigation docs
    return (
      <SafeAreaView
        forceInset={{ top: 'always', horizontal: 'never' }}
        style={styles.container}
      >
        <ScrollView style={styles.scrollBar}>
          <DrawerItems
            labelStyle={styles.label}
            activeTintColor={styles.color.color}
            {...this.props}
          />
          <Button full transparent dark onPress={this._onLogout}>
            <Text style={styles.label}>
              {locale['drawer.logout']}
            </Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

Drawer.propTypes = {
  onLogout: PropTypes.func.isRequired
}

export default Drawer;
