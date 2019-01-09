import React, { PureComponent } from 'react';
import { Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import background from './resources/background';
import styles from './Styles';

class Backdrop extends PureComponent {
  render() {
    const { width, height } = this.props;

    return (
      <Image
        source={{ uri: background }}
        style={[
          { width, height },
          this.props.style,
          styles.backdrop
        ]}
        resizeMode='repeat'
      />
    );
  }
}

Backdrop.defaultProps = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

Backdrop.propTypes = {
  style: Image.propTypes.style,
  width: PropTypes.number,
  height: PropTypes.number
}

export default Backdrop;
