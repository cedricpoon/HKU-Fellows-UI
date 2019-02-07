import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';

import PopupMenu from '../../PopupMenu/PopupMenu';

import { MOODLE, TIMESTAMP, REPLIES, TEMPERATURE } from 'hkufui/src/constants/filterStatus';
import { localize } from 'hkufui/locale';
import styles from 'hkufui/theme/Styles';
const locale = localize({ language: 'en', country: 'hk' });

class FilterPopup extends Component {
  render() {
    const { onRef, onFilterThunk, disabled, ...restProps } = this.props;

    return(
      <PopupMenu
       /* Proptypes handling on <PopupMenu /> */
        ref={onRef}
        { ...restProps }
      >
        <Button transparent info iconLeft onPress={onFilterThunk(MOODLE)} disabled={disabled === MOODLE}>
          <Icon name="link" type="MaterialIcons" style={styles.icon}></Icon>
          <Text>{locale['footer.moodle']}</Text>
        </Button>
        <Button transparent success iconLeft onPress={onFilterThunk(TIMESTAMP)} disabled={disabled === TIMESTAMP}>
          <Icon name="clock-fast" type="MaterialCommunityIcons" style={styles.icon}></Icon>
          <Text>{locale['footer.latestPost']}</Text>
        </Button>
        <Button transparent success iconLeft onPress={onFilterThunk(REPLIES)} disabled={disabled === REPLIES}>
          <Icon name="undo" style={styles.icon}></Icon>
          <Text>{locale['footer.mostReplied']}</Text>
        </Button>
        <Button transparent success iconLeft onPress={onFilterThunk(TEMPERATURE)} disabled={disabled === TEMPERATURE}>
          <Icon name="people" type="MaterialIcons" style={styles.icon}></Icon>
          <Text>{locale['footer.popularity']}</Text>
        </Button>
      </PopupMenu>
    );
  }
}

FilterPopup.defaultProps = {
  onFilterThunk: () => {}
}

FilterPopup.propTypes = {
  onRef: PropTypes.func,
  disabled: PropTypes.oneOf([ MOODLE, TIMESTAMP, REPLIES, TEMPERATURE ]),
  onFilterThunk: PropTypes.func.isRequired
}

export default FilterPopup;
