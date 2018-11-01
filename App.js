import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>HKU Fellows UI</Text>
        <Text style={styles.subtitle}>A Standalone Project for <Text style={styles.highlight}>User Interface</Text></Text>
      </View>
    );
  }
}

const logoGreen = '#4BBC89';
const logoRed = '#E03A00';
const logoBlue = '#3B96DC';
const white  = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  highlight: {
    color: logoRed
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: logoGreen
  },
  subtitle: {
    textAlign: 'center',
    color: logoBlue
  },
});
