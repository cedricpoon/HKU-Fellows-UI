import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Header, Item, Input, Icon, Button, Right, Text } from 'native-base';
import { Keyboard } from 'react-native';

import NavigationService from 'hkufui/src/navigation/NavigationService';
import { displayName as appName } from 'hkufui/app.json';
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
    this._searchBar._root.blur();
    this._searchBar._root.clear();

    Keyboard.dismiss();

    this.setState(() => ({
      inputFocused: false
    }));
  }

  render() {
    const { location } = this.props;
    const { inputFocused } = this.state;

    const inputIcon = location === '' ? 'arrow-dropright' : 'search'

    return (
      <Header searchBar style={styles.header}>
        <Item rounded>
          <Button
            rounded
            style={styles.leftLabel}
            onPress={() => {
              NavigationService.navigate('SelectCourse');
            }}
          >
            <Text style={styles.leftLabelText}>
              {location !== '' ? location : appName}
            </Text>
          </Button>

          <Input
            placeholder={
              location !== '' ?
                `${locale['header.searchPlaceholder']}`
              :
                `${locale['header.noCoursePlaceholder']}`
            }
            style={styles.input}
            returnKeyType="search"
            onFocus={this.searchBarOnFocus}
            ref={(ref) => { this._searchBar = ref }}
            enablesReturnKeyAutomatically
            disabled={location === ''}
          />

          <Right style={styles.rightButtons}>
            <Button
              transparent
              small
              dark
              disabled={!inputFocused}
              onPress={this.searchCancel}
            >
              <Icon name={inputFocused ? "close-circle" : inputIcon} style={styles.rightIcon} />
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

export default PreviewHeader;
