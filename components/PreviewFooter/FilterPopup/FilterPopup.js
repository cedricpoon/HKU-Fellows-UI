import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';

import PopupMenu from '../../PopupMenu/PopupMenu';

import { localize } from 'hkufui/locale';
import styles from 'hkufui/theme/Styles';
const locale = localize({ language: 'en', country: 'hk' });

class FilterPopup extends Component {
  render() {
    const { onRef, ...restProps } = this.props;

    return(
      <PopupMenu
       /* Proptypes handling on <PopupMenu /> */
        ref={onRef}
        { ...restProps }
      >
        <Button transparent info iconLeft>
          <Icon name="link" type="MaterialIcons" style={styles.icon}></Icon>
          <Text>{locale['footer.moodle']}</Text>
        </Button>
        <Button transparent success iconLeft>
          <Icon name="clock-fast" type="MaterialCommunityIcons" style={styles.icon}></Icon>
          <Text>{locale['footer.latestPost']}</Text>
        </Button>
        <Button transparent success iconLeft>
          <Icon name="undo" style={styles.icon}></Icon>
          <Text>{locale['footer.mostReplied']}</Text>
        </Button>
        <Button transparent success iconLeft>
          <Icon name="people" type="MaterialIcons" style={styles.icon}></Icon>
          <Text>{locale['footer.popularity']}</Text>
        </Button>
      </PopupMenu>
    );
  }
}

FilterPopup.propTypes = {
  onRef: PropTypes.func
}

export default FilterPopup;
