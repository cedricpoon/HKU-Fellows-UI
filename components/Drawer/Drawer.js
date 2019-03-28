import React, { PureComponent } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { DrawerItems } from 'react-navigation';
import PropTypes from 'prop-types';

import NavigationService from 'hkufui/src/NavigationService';
import Logo from '../Logo/Logo';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Styles';
import { LOGO_SIZE } from './Contants';
import { mapLayoutToState } from 'hkufui/components/helper';
import { localize } from 'hkufui/locale';
import { hotPostMinIndex as hot } from 'hkufui/config';

const locale = localize({ language: 'en', country: 'hk' });

export class Drawer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { drawerLayout: { width: 0, height: 0 } };
  }

  _onLogout = async () => {
    const { onLogout } = this.props;
    try {
      await onLogout();
      // navigate to login screen
      NavigationService.reset('Login');
    } catch (e) { /* ignored */ }
  }

  render() {
    const { username, temperature, token7digits, onTemperature } = this.props;
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
            <View style={[styles.userInfoGroup, { height: LOGO_SIZE }]}>
              <Text style={styles.secondaryUserInfo}>{locale['drawer.userInfoIndicator']}</Text>
              <Text style={styles.userInfo}>{username}</Text>
              <Text style={[styles.userInfo, temperature && temperature > hot && styles.hot]}>
                <Icon style={[styles.userInfo, temperature && temperature > hot && styles.hot]} name='ios-flame'/> {temperature === null ? '-' : temperature}
              </Text>
              <Text style={styles.secondaryUserInfo}>
                <Icon style={styles.secondaryUserInfo} name='key' type='Foundation'/> {token7digits}
              </Text>
            </View>
          </View>
          <DrawerItems
            labelStyle={styles.label}
            activeTintColor={styles.color.color}
            {...this.props}
          />
          <Button full transparent dark onPress={onTemperature}>
            <Text style={styles.label}>
              Refresh Temperature
            </Text>
          </Button>
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

Drawer.defaultProps = {
  username: '-',
  token7digits: '0000000',
  temperature: null
}

Drawer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onTemperature: PropTypes.func.isRequired,
  username: PropTypes.string,
  token7digits: PropTypes.string,
  temperature: PropTypes.number
}

export default Drawer;
