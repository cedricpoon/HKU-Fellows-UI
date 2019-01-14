import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';

import { PopupMenu } from 'hkufui/components';

import { localize } from 'hkufui/locale';
import styles from 'hkufui/theme/Styles';
const locale = localize({ language: 'en', country: 'hk' });

class PostHeaderMenu extends Component {

  render() {
    const { onRef, native, ...restProps } = this.props;

    return(
      <PopupMenu
        ref={onRef}
        { ...restProps } /* Proptypes handling on <PopupMenu /> */
      >
        <Button transparent iconLeft light={native} disabled={!native}>
          <Icon name="notifications" type="MaterialIcons" style={styles.icon}></Icon>
          <Text>{locale['header.notifications']}</Text>
        </Button>
        <Button transparent iconLeft danger>
          <Icon name="report" type="MaterialIcons" style={styles.icon}></Icon>
          <Text>{locale['header.abuse']}</Text>
        </Button>
      </PopupMenu>
    );
  }
}

PostHeaderMenu.propTypes = {
  onRef: PropTypes.func,
  native: PropTypes.bool
}

export default PostHeaderMenu;
