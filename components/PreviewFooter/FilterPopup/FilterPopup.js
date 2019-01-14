import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';

import PopupMenu from '../../PopupMenu/PopupMenu';

import { localize } from 'hkufui/locale';
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
        <Button full transparent info iconRight>
          <Text>{locale['footer.moodle']}</Text>
          <Icon name="link" type="MaterialIcons"></Icon>
        </Button>
        <Button full transparent success iconRight>
          <Text>{locale['footer.latestPost']}</Text>
          <Icon name="clock-fast" type="MaterialCommunityIcons"></Icon>
        </Button>
        <Button full transparent success iconRight>
          <Text>{locale['footer.mostReplied']}</Text>
          <Icon name="undo"></Icon>
        </Button>
        <Button full transparent success iconRight>
          <Text>{locale['footer.popularity']}</Text>
          <Icon name="people" type="MaterialIcons"></Icon>
        </Button>
      </PopupMenu>
    );
  }
}

FilterPopup.propTypes = {
  onRef: PropTypes.func
}

export default FilterPopup;
