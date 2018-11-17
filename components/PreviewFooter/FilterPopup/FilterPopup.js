import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';

import PopupMenu from '../PopupMenu/PopupMenu';

import { localize } from 'hkufui/locale';
const locale = localize({ language: 'en', country: 'hk' });

class FilterPopup extends Component {

  render() {
    const { ...restProps } = this.props;

    return(
      <PopupMenu { ...restProps } /* Proptypes handling on <PopupMenu /> */ >
        <Button full transparent info iconRight>
          <Text>{locale['footer.moodle']}</Text>
          <Icon name="at"></Icon>
        </Button>
        <Button full transparent success iconRight>
          <Text>{locale['footer.latestPost']}</Text>
          <Icon name="time"></Icon>
        </Button>
        <Button full transparent success iconRight>
          <Text>{locale['footer.mostReplied']}</Text>
          <Icon name="undo"></Icon>
        </Button>
        <Button full transparent success iconRight>
          <Text>{locale['footer.popularity']}</Text>
          <Icon name="people"></Icon>
        </Button>
      </PopupMenu>
    );
  }
}

FilterPopup.proptypes = {
  /* Require PopupMenu proptypes */
  ...PopupMenu.proptypes
}

export default FilterPopup;
