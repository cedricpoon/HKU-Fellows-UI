import React, { Component } from 'react';
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { mapLayoutToState } from 'hkufui/components/helper';
import styles from './Styles';
import { footer } from 'hkufui/theme/grid';

class PopupMenu extends Component {

  constructor(props) {
    super(props);

    /* init width for first time rendering */
    const _menuLayout = {};
    _menuLayout['width'] = 0;
    this.state = { menuLayout: _menuLayout };
  }

  render() {
    const { children, position, parentHeight, toggle } = this.props;
    const { menuLayout } = this.state;

    const conceal = () => {
      this._menu.zoomOut(100).then(toggle);
    }

    /* Calculate position */
    const appendLeft = {};
    const screenWidth = Dimensions.get('window').width
    if (position <= 0) {
      appendLeft.left = footer.popUpMargin;
    } else if (position + menuLayout.width >= screenWidth) {
      appendLeft.left = screenWidth - menuLayout.width - footer.popUpMargin;
    } else {
      appendLeft.left = position;
    }

    return(
      <View style={ styles.container }>
        <TouchableWithoutFeedback onPress={conceal}>
          <View
            style={[
              styles.outsider,
              { top: styles.outsider.top + parentHeight }
            ]}
          ></View>
        </TouchableWithoutFeedback>

        <Animatable.View
          style={[
            styles.menu,
            {
              ...appendLeft,
              bottom: parentHeight + 10
            }
          ]}
          animation="zoomIn"
          duration={100}
          onLayout={mapLayoutToState("menuLayout", this)}
          ref={ref => { this._menu = ref }}
        >
          { children }
        </Animatable.View>
      </View>
    );
  }
}

PopupMenu.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.number.isRequired,
  parentHeight: PropTypes.number,
  toggle: PropTypes.func.isRequired
}

export default PopupMenu;
