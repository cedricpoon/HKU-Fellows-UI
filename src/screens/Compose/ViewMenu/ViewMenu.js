import React, { Component } from 'react';
import { Icon, Text } from 'native-base';
import PropTypes from 'prop-types';

import { PopupMenu, PopupMenuItem } from 'hkufui/components';
import NavigationService from 'hkufui/src/NavigationService';
import { localize } from 'hkufui/locale';
import styles from 'hkufui/theme/Styles';

const locale = localize({ language: 'en', country: 'hk' });

class ViewMenu extends Component {
  constructor(props) {
    super(props);
  }

  _showPreview = (anonymity) => {
    this._popup.toggle();
    NavigationService.navigate('ComposePreview', {
      anonymity,
      ...this.props.payload
    });
  }

  render() {
    const { onRef, ...restProps } = this.props;

    return(
      <PopupMenu
       /* Proptypes handling on <PopupMenu /> */
        ref={ref => { this._popup = ref; onRef(ref) }}
        { ...restProps }
      >
        <PopupMenuItem transparent success iconLeft onPress={() => { this._showPreview(false) }}>
          <Icon name="face" type="MaterialIcons" style={styles.icon}></Icon>
          <Text>{locale['new.nonAnonymous']}</Text>
        </PopupMenuItem>
        <PopupMenuItem transparent info iconLeft onPress={() => { this._showPreview(true) }}>
          <Icon name="incognito" type="MaterialCommunityIcons" style={styles.icon}></Icon>
          <Text>{locale['new.anonymous']}</Text>
        </PopupMenuItem>
      </PopupMenu>
    );
  }
}

ViewMenu.propTypes = {
  onRef: PropTypes.func,
  payload: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    hashtags: PropTypes.object,
    content: PropTypes.string.isRequired
  }).isRequired
}

export default ViewMenu;
