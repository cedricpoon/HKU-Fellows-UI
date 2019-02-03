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
    this.state = { menuLayout: _menuLayout, toggleFlag: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ toggleFlag: !this.state.toggleFlag });
  }

  render() {
    const { children, position, parentHeight } = this.props;
    const { menuLayout, toggleFlag } = this.state;
    const { width, height } = Dimensions.get('window');

    if (toggleFlag) {
      const conceal = () => {
        this._menu.zoomOut(100).then(this.toggle);
      }

      /* Calculate position */
      const appendPos = { left: position.x, top: parentHeight + footer.popUpMargin };
      if (position.x <= 0) {
        appendPos.left = footer.popUpMargin;
      } else if (position.x + menuLayout.width >= width) {
        appendPos.left = width - menuLayout.width - footer.popUpMargin;
      }

      if (position.y < 0) {
        appendPos.top = appendPos.top + menuLayout.height;
      } else if (position.y + menuLayout.height >= height) {
        appendPos.top = -menuLayout.height - footer.popUpMargin
      }

      return(
        <View style={ styles.container }>
          <TouchableWithoutFeedback onPress={conceal}>
            <View
              style={[
                styles.outsider,
                {top: -position.y}
              ]}
            ></View>
          </TouchableWithoutFeedback>

          <Animatable.View
            style={[
              styles.menu,
              { ...appendPos }
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
    } else {
      return null;
    }
  }
}

const position = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

PopupMenu.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.shape(position).isRequired,
  parentHeight: PropTypes.number
}

export default PopupMenu;
