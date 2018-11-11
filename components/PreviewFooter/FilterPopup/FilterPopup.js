import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';

import PopupMenu from '../PopupMenu/PopupMenu';

class FilterPopup extends Component {

  render() {
    const { ...restProps } = this.props;

    return(
      <PopupMenu { ...restProps } /* Proptypes handling on <PopupMenu /> */ >
        <Button full transparent info iconRight>
          <Text>From Moodle</Text>
          <Icon name="at"></Icon>
        </Button>
        <Button full transparent success iconRight>
          <Text>Latest Post</Text>
          <Icon name="time"></Icon>
        </Button>
        <Button full transparent success iconRight>
          <Text>Most Replied</Text>
          <Icon name="undo"></Icon>
        </Button>
        <Button full transparent success iconRight>
          <Text>Popularity</Text>
          <Icon name="people"></Icon>
        </Button>
      </PopupMenu>
    );
  }
}

export default FilterPopup;
