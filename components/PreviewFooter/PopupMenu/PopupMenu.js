import React, { Component } from 'react';
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './Styles';

class PopupMenu extends Component {

  constructor(props) {
    super(props);

    this.state = { width: 0 }
    this.setWidthToState = this.setWidthToState.bind(this);
  }

  setWidthToState(event) {
    this.setState({
      width: event.nativeEvent.layout.width
    });
  }

  render() {
    const { children, position, parentHeight, toggle, rightSided } = this.props;
    const { width } = this.state;

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
              left: position - (rightSided ? width : 0),
              bottom: parentHeight + 10
            }
          ]}
          animation="zoomIn"
          duration={100}
          onLayout={this.setWidthToState}
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
