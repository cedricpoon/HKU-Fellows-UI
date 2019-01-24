import React, { Component } from 'react';
import { Button, Icon, Text, Separator } from 'native-base';
import PropTypes from 'prop-types';

import { PopupMenu } from 'hkufui/components';

import { localize } from 'hkufui/locale';
import themeStyles from 'hkufui/theme/Styles';
const locale = localize({ language: 'en', country: 'hk' });

import styles from './Styles';

class PostHeaderMenu extends Component {

  render() {
    const { onRef, index, solved, native, ...restProps } = this.props;

    return(
      <PopupMenu
        ref={onRef}
        { ...restProps } /* Proptypes handling on <PopupMenu /> */
      >
        {native && (
          <Button transparent iconLeft light>
            <Icon name="thumb-up" type="MaterialCommunityIcons" style={themeStyles.icon}></Icon>
            <Text>{locale['header.thumbUp'](index)}</Text>
          </Button>
        )}
        {native && (
          <Button transparent iconLeft light>
            <Icon name="thumb-down" type="MaterialCommunityIcons" style={themeStyles.icon}></Icon>
            <Text>{locale['header.thumbDown'](index)}</Text>
          </Button>
        )}
        {native && (
          <Button transparent iconLeft warning disabled={solved}>
            <Icon name="checkbox-marked-circle-outline" type="MaterialCommunityIcons" style={themeStyles.icon}></Icon>
            <Text>{locale['header.solved']}</Text>
          </Button>
        )}
        {native && (
          <Separator style={styles.separator} />
        )}
        {native && (
          <Button transparent iconLeft light>
            <Icon name="notifications" type="MaterialIcons" style={themeStyles.icon}></Icon>
            <Text>{locale['header.notifications']}</Text>
          </Button>
        )}
        <Button transparent iconLeft danger>
          <Icon name="report" type="MaterialIcons" style={themeStyles.icon}></Icon>
          <Text>{locale['header.abuse']}</Text>
        </Button>
      </PopupMenu>
    );
  }
}



PostHeaderMenu.propTypes = {
  onRef: PropTypes.func,
  native: PropTypes.bool,
  index: PropTypes.number.isRequired,
  solved: PropTypes.bool
}

export default PostHeaderMenu;
