import React, { Component } from 'react';
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { mapLayoutToState } from 'hkufui/components/helper';
import styles from './Styles';

class PopupMenu extends Component {

  constructor(props) {
    super(props);

    /* init width for first time rendering */
    const _menu = {};
    _menu['width'] = 0;
    this.state = { menu: _menu };
  }

  render() {
    const { children, position, parentHeight, toggle, rightSided } = this.props;
    const { menu } = this.state;

    const conceal = () => {
      this.menu.zoomOut(100).then(toggle);
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
              left: position - (rightSided ? menu.width : 0),
              bottom: parentHeight + 10
            }
          ]}
          animation="zoomIn"
          duration={100}
          onLayout={mapLayoutToState("menu", this)}
          ref={ref => { this.menu = ref }}
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
  rightSided: PropTypes.bool,
  toggle: PropTypes.func.isRequired
}

export default PopupMenu;
