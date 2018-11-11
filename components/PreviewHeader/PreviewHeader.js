import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Header, Item, Input, Icon, Button, Right, Text, Toast } from 'native-base';
import { Keyboard } from 'react-native';

import { localize } from 'hkufui/locale';
const locale = localize({ language: 'en', country: 'hk' });

import styles from './Styles'
import { toastDuration } from 'hkufui/store';

class PreviewHeader extends Component {

  constructor(props) {
    super(props);
    this.state = { inputFocused: false };

    this.searchBarOnFocus = this.searchBarOnFocus.bind(this);
    this.searchCancel = this.searchCancel.bind(this);
    this.validation = this.validation.bind(this);
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

  validation(event) {
    if (event.nativeEvent.text.length == 0) {
      /* Empty searchBar */
      Toast.show({
        text: locale["header.searchEmptyMessage"],
        buttonText: locale["header.searchEmptyConfirm"],
        duration: toastDuration,
      });

      this.searchCancel();
    } else {
      /* Valid query */
    }
  }

  render() {
    const { location } = this.props;
    const { inputFocused } = this.state;

    return (
      <Header searchBar>
        <Item rounded>
          <Button rounded style={styles.leftLabel}>
            <Text style={styles.leftLabelText}>{location}</Text>
          </Button>

          <Input
            placeholder={`${locale['header.searchPlaceholder']}`}
            style={styles.input}
            returnKeyType="search"
            onFocus={this.searchBarOnFocus}
            ref={(ref) => { this.searchBar = ref }}
            onSubmitEditing={this.validation}
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

export default PreviewHeader;
