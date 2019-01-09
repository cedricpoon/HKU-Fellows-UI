import React, { PureComponent } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Text } from 'native-base';
import { DrawerItems } from 'react-navigation';
import PropTypes from 'prop-types';

import NavigationService from 'hkufui/src/NavigationService';
import Logo from '../Logo/Logo';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Styles';
import { LOGO_SIZE } from './Contants';
import { mapLayoutToState } from 'hkufui/components/helper';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

export class Drawer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { drawerLayout: { width: 0, height: 0 } };
    this._onLogout = this._onLogout.bind(this);
  }

  _onLogout() {
    const { onLogout } = this.props;
    onLogout();
    // navigate to login screen
    NavigationService.reset('Login');
  }

  render() {
    const { drawerLayout } = this.state;
    // following react-navigation docs
    return (
      <SafeAreaView
        forceInset={{ top: 'always', horizontal: 'never' }}
        onLayout={mapLayoutToState("drawerLayout", this)}
        style={styles.container}
      >
        <View style={styles.wrapper}>
          <View style={styles.items}>
            <Logo size={LOGO_SIZE} />
          </View>
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
        </View>
        <Backdrop
          width={drawerLayout.width}
          height={drawerLayout.height}
          style={styles.backdrop}
        />
      </SafeAreaView>
    );
  }
}

Drawer.propTypes = {
  onLogout: PropTypes.func.isRequired
}

export default Drawer;
