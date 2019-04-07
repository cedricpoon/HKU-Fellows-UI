import React, { PureComponent } from 'react';
import { Platform, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Button } from 'native-base';
import variable from "hkufui/native-base-theme/variables/platform";

const styles = StyleSheet.create({
  button: {
    width: Platform.OS === 'android' ? '100%' : null
  }
});

class PopupMenuItem extends PureComponent {
  render() {
    return (
      <Button
        style={styles.button}
        background={TouchableNativeFeedback.Ripple(variable.androidRippleColor, false)}
        {...this.props}
      />
    );
  }
}

export default PopupMenuItem;
