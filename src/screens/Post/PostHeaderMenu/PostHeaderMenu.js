import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';

import { PopupMenu } from 'hkufui/components';

import { localize } from 'hkufui/locale';
const locale = localize({ language: 'en', country: 'hk' });

class PostHeaderMenu extends Component {

  render() {
    const { onRef, ...restProps } = this.props;

    return(
      <PopupMenu
        ref={onRef}
        { ...restProps } /* Proptypes handling on <PopupMenu /> */
      >
        <Button full transparent info iconRight>
          <Text>{locale['footer.moodle']}</Text>
          <Icon name="link" type="MaterialIcons"></Icon>
        </Button>
      </PopupMenu>
    );
  }
}

PostHeaderMenu.propTypes = {
  onRef: PropTypes.func
}

export default PostHeaderMenu;
