import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  highlight: {
    color: '#E03A00'
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#4BBC89'
  },
  subtitle: {
    textAlign: 'center',
    color: '#3B96DC',
  },
});
