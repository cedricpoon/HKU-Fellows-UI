import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Header, Item, Input, Icon, Button, Right, Text } from 'native-base';
import { Keyboard } from 'react-native';
import { withNavigation } from 'react-navigation'

import { localize } from 'hkufui/locale';
const locale = localize({ language: 'en', country: 'hk' });

import styles from './Styles'

class PreviewHeader extends Component {

  constructor(props) {
    super(props);
    this.state = { inputFocused: false };

    this.searchBarOnFocus = this.searchBarOnFocus.bind(this);
    this.searchCancel = this.searchCancel.bind(this);
  }

  searchBarOnFocus() {
    this.setState(() => ({
      inputFocused: true
    }));
  }

  searchCancel() {
    this.searchBar._root.blur();
    this.searchBar._root.clear();

    Keyboard.dismiss();

    this.setState(() => ({
      inputFocused: false
    }));
  }

  render() {
    const { location } = this.props;
    const { inputFocused } = this.state;

    return (
      <Header searchBar style={styles.header}>
        <Item rounded>
          <Button
            rounded
            style={styles.leftLabel}
            onPress={() => {
              this.props.navigation.navigate('SelectCourse');
            }}
          >
            <Text style={styles.leftLabelText}>{location}</Text>
          </Button>

          <Input
            placeholder={`${locale['header.searchPlaceholder']}`}
            style={styles.input}
            returnKeyType="search"
            onFocus={this.searchBarOnFocus}
            ref={(ref) => { this.searchBar = ref }}
            enablesReturnKeyAutomatically
          />

          <Right style={styles.rightButtons}>
            <Button
              transparent
              small
              dark
              disabled={!inputFocused}
              onPress={this.searchCancel}
            >
              <Icon name={inputFocused ? "close-circle" : "search"} style={styles.rightIcon} />
            </Button>
          </Right>

        </Item>
      </Header>
    );
  }
}

PreviewHeader.propTypes = {
  location: PropTypes.string.isRequired
};

export default withNavigation(PreviewHeader);
