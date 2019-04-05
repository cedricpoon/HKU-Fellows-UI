import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Header, Item, Input, Icon, Button, Right, Text } from 'native-base';
import { Keyboard } from 'react-native';

import NavigationService from 'hkufui/src/NavigationService';
import { displayName as appName } from 'hkufui/app.json';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

import styles from './Styles'

class PreviewHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { inputFocused: false, query: '' };
  }

  searchBarOnFocus = () => {
    this.setState(() => ({
      inputFocused: true
    }));
  }

  searchCancel = () => {
    this._searchBar._root.blur();
    this._searchBar._root.clear();

    Keyboard.dismiss();

    this.props.onCancel(this.state.query !== '');

    this.setState(() => ({
      inputFocused: false,
      query: ''
    }));
  }

  render() {
    const { location, onSearchThunk } = this.props;
    const { inputFocused, query } = this.state;

    const inputIcon = location === '' ? 'ios-arrow-dropright' : 'search'

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
            autoCorrect={false}
            onSubmitEditing={onSearchThunk(query)}
            onChangeText={(query) => this.setState({query})}
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
              <Icon name={inputFocused ? "close-circle-outline" : inputIcon} style={styles.rightIcon} />
            </Button>
          </Right>

        </Item>
      </Header>
    );
  }
}

PreviewHeader.defaultProps = {
  onSearchThunk: () => {},
  onCancel: () => {}
}

PreviewHeader.propTypes = {
  location: PropTypes.string.isRequired,
  onSearchThunk: PropTypes.func,
  onCancel: PropTypes.func
};

export default PreviewHeader;
