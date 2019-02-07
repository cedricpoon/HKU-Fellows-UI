import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';

import PopupMenu from 'hkufui/components/PopupMenu/PopupMenu';

import { localize } from 'hkufui/locale';
import styles from 'hkufui/theme/Styles';
const locale = localize({ language: 'en', country: 'hk' });

class ViewMenu extends Component {
  render() {
    const { onRef, ...restProps } = this.props;

    return(
      <PopupMenu
       /* Proptypes handling on <PopupMenu /> */
        ref={onRef}
        { ...restProps }
      >
        <Button transparent success iconLeft>
          <Icon name="face" type="MaterialIcons" style={styles.icon}></Icon>
          <Text>{locale['new.nonAnonymous']}</Text>
        </Button>
        <Button transparent info iconLeft>
          <Icon name="incognito" type="MaterialCommunityIcons" style={styles.icon}></Icon>
          <Text>{locale['new.anonymous']}</Text>
        </Button>
      </PopupMenu>
    );
  }
}

ViewMenu.propTypes = {
  onRef: PropTypes.func
}

export default ViewMenu;
