import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './Styles';

class PopupMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { toggleFlag: false };
  }

  toggle = () => {
    const { height } = Dimensions.get('window');
    const { toggleFlag } = this.state;

    const flipFlag = () => { this.setState({ toggleFlag: !this.state.toggleFlag }); };

    if (toggleFlag) {
      if (position.y > height / 2)
        this._menu.fadeOutDown(100).then(flipFlag);
      else
        this._menu.fadeOutUp(100).then(flipFlag);
    } else {
      flipFlag();
    }
  }

  _renderOutsider = () => {
    return (
      <TouchableWithoutFeedback onPress={this.toggle}>
        <View style={styles.outsider} />
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { children, position } = this.props;
    const { toggleFlag } = this.state;
    const { height } = Dimensions.get('window');

    if (toggleFlag) {
      return(
        <View>
          <Animatable.View
            style={styles.menuAndroid}
            animation={position.y > height / 2 ? "fadeInUp" : "fadeInDown"}
            duration={100}
            ref={ref => { this._menu = ref }}
          >
            { children }
          </Animatable.View>
          {this._renderOutsider()}
        </View>
      );
    } else {
      return null;
    }
  }
}

const position = {
  y: PropTypes.number.isRequired
}

PopupMenu.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.shape(position).isRequired,
}

export default PopupMenu;
